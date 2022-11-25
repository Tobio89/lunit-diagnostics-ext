import { useState } from "react";
import { cloneDeep } from "lodash";
import { Metrics, IndividualMetric } from "../types";



function useLogs() {

  const [metrics, setMetrics] = useState<Metrics| undefined>(undefined)
  const [activeMetric, setActiveMetric] = useState<string|undefined>(undefined)
  const [justLoaded, setJustLoaded] = useState<boolean>(true)

  chrome.runtime.onMessage.addListener(
    function(request) {

      if (request.msg === 'initialise metrics' && !metrics ){
        setMetrics(request.payload)
      } else if (request.msg === 'update'){
        if (!metrics) return
        const {project, scope, news, extra}= request.payload as {project:string, scope:string, news:{target:string, value:number }, extra?:any}
        if (project !== activeMetric) setActiveMetric(project)
        const newVals = {...metrics[project][scope]}
        if (news.target !== 'recent'){
          newVals[news.target as keyof IndividualMetric] = news.value
        }
        newVals.recent = news.value
        if (extra) newVals.extra = extra
        const newMetrics = cloneDeep(metrics)
        newMetrics[project][scope] = newVals
        setMetrics(newMetrics)
      }
    
    }
  );
  
 if (justLoaded){
  chrome.runtime.sendMessage({msg:"give logs"}, (request)=> {
    if (request.msg === 'empty'){
      setJustLoaded(false)
      return
    } else {
      console.log('request.logs', request.logs)
      setMetrics(request.logs)
      setActiveMetric(request.activeMetric)
      setJustLoaded(false)
    }
  })
 }

  return {
    metrics: !!activeMetric ? metrics?.[activeMetric] : undefined,
    activeMetric
  };
}
export default useLogs