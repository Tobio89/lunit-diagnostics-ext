import { IndividualMetric } from "../../../types";

import styles from "./MetricsLog.module.css";

interface Props{
  scope:string
  metrics:IndividualMetric
};

function MetricsLog({ scope, metrics}:Props){

  const {max, min, recent} = metrics
  return (
    <div className={styles.MetricsLog}>
      <div>{scope}</div>
      <div>
        <div>{`max: ${max}`}</div>
        <div>{`min: ${min}`}</div>
        <div>{`recent: ${recent}`}</div>
      </div>
    </div>
  );

}

export default MetricsLog;