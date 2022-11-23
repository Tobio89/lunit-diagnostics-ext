import { useState } from "react";
import { cloneDeep } from "lodash";
import { Metrics } from "../types";
function useLogs() {

  const [metrics, setMetrics] = useState<Metrics| undefined>(undefined)
  const [activeMetric, setActiveMetric] = useState<string|undefined>(undefined)

  chrome.runtime.onMessage.addListener(
    function(request, _, sendResponse) {

      if (request.msg === 'initialise metrics' && !metrics ){
        console.log('metrics', request.payload)
        setMetrics(request.payload)
      } else if (request.msg === 'update'){
        if (!metrics) return
        const {project, scope, news}= request.payload as {project:string, scope:string, news:{min?:number, max?:number, recent:number }}
        if (project !== activeMetric) setActiveMetric(project)
        const newVals = {...metrics[project][scope], ...news}
        const newMetrics = cloneDeep(metrics)
        newMetrics[project][scope] = newVals
        setMetrics(newMetrics)
      }
    
    }
  );
  

  return {
    metrics: !!activeMetric ? metrics?.[activeMetric] : undefined,
    activeMetric
  };
}
export default useLogs