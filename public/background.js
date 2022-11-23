/*global chrome */

let logs = [];
let metrics = undefined;

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

chrome.runtime.onMessageExternal.addListener(function (
  request,
  _,
  sendResponse
) {
  if (request.msg === "initialise structure") {
    metrics = parseConfig(request.payload);
    chrome.runtime.sendMessage({
      msg: "initialise metrics",
      payload: metrics,
    });
  } else if (request.msg === "log") {
    if (!metrics) {
      console.log("metrics not initialized");
      return;
    }
    const { label, duration } = request.payload;
    const result = {
      recent: duration,
    };
    if (duration < metrics[label.project][label.scope].min) {
      metrics[label.project][label.scope].min = duration;
      result.max = duration;
    } else if (duration > metrics[label.project][label.scope].max) {
      metrics[label.project][label.scope].max = duration;
      result.min = duration;
    }
    chrome.runtime.sendMessage({
      msg: "update",
      payload: {
        project: label.project,
        scope: label.scope,
        news: result,
      },
    });
  }
});

chrome.runtime.onMessage.addListener(function (_, __, sendResponse) {
  sendResponse({ logs: logs });
});
