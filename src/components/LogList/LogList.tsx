import MetricsLog from "./MetricsLog";

import useLogs from "../../hooks/useLogs";

import styles from "./LogList.module.css";

function LogList(){

  const {metrics, activeMetric} = useLogs()


  return (
    <div className={styles.LogList}>
      <div>{activeMetric && activeMetric}</div>
      {metrics && activeMetric &&  Object.entries(metrics).map(([scope, metrics])=>{
          return <MetricsLog scope={scope} metrics={metrics} />
        })
      }
    </div>
  );

}

export default LogList;