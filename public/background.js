/*global chrome */
let metrics = undefined;
let activeProject = undefined;
let activeScope = undefined;

function parseConfig(config) {
  const result = {};
  Object.entries(config).forEach(([name, settings]) => {
    if (name === "time" || name === "workers") return;
    if (settings.diagnosticsOn) {
      const scopes = {};
      console.log("settings", settings);
      Object.entries(settings.diagnosticPoints).forEach(([scope, isOn]) => {
        if (scope === "diagnosticsOn") return;
        if (isOn) scopes[scope] = { min: 0, max: 0, recent: 0 };
      });
      result[name] = scopes;
    }
  });
  return result;
}

chrome.runtime.onMessageExternal.addListener(function (request) {
  if (request.msg === "initialise structure") {
    metrics = parseConfig(request.payload);
    console.log("metrics", metrics);
    chrome.runtime.sendMessage({
      msg: "initialise metrics",
      payload: metrics,
    });
  } else if (request.msg === "log") {
    if (!metrics) {
      console.log("metrics not initialized");
      return;
    }
    const { label, duration, extra } = request.payload;
    const result = {
      target: "recent",
      value: duration,
    };
    metrics[label.project][label.scope].recent = duration;
    if (
      metrics[label.project][label.scope].min === 0 ||
      duration < metrics[label.project][label.scope].min
    ) {
      metrics[label.project][label.scope].min = duration;
      result.target = "min";
    } else if (duration > metrics[label.project][label.scope].max) {
      metrics[label.project][label.scope].max = duration;
      result.target = "max";
    }
    if (activeProject !== label.project) {
      activeProject = label.project;
    }
    chrome.runtime.sendMessage({
      msg: "update",
      payload: {
        project: label.project,
        scope: label.scope,
        news: result,
        extra,
      },
    });
  }
});

chrome.runtime.onMessage.addListener(function (_, __, sendResponse) {
  if (!metrics || !activeProject) {
    sendResponse({ msg: "empty" });
  }
  sendResponse({ msg: "success", logs: metrics, activeProject });
});
