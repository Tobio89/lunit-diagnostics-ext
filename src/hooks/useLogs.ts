import { useState } from "react";
import { cloneDeep } from "lodash";
import { Metrics, IndividualMetric } from "../types";



function useLogs() {

  const [metrics, setMetrics] = useState<Metrics| undefined>(undefined)
  const [activeProject, setActiveProject] = useState<string|undefined>(undefined)
  const [justLoaded, setJustLoaded] = useState<boolean>(true)

  chrome.runtime.onMessage.addListener(
    function(request) {

      if (request.msg === 'initialise metrics' && !metrics ){
        setMetrics(request.payload)
      } else if (request.msg === 'update'){
        if (!metrics) return
        const {project, scope, news, extra}= request.payload as {project:string, scope:string, news:{target:string, value:number }, extra?:any}
        if (project !== activeProject) setActiveProject(project)
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
      setActiveProject(request.activeProject)
      setJustLoaded(false)
    }
  })
 }

  return {
    metrics: !!activeProject ? metrics?.[activeProject] : undefined,
    activeProject
  };
}
export default useLogs