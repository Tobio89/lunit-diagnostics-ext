import { IndividualMetric } from "../../../types";

import styles from "./MetricsLog.module.css";

interface Props {
  scope: string;
  metrics: IndividualMetric;
}

function MetricsLog({ scope, metrics }: Props) {
  const { max, min, recent, extra } = metrics;
  return (
    <div className={styles.MetricsLog}>
      <div className={styles.Scope}>Metric: {scope}</div>
      <div className={styles.MetricTable}>
        <div className={styles.Metric}>
          <span className={styles.Key}>last: </span>
          <span className={styles.Val}>{recent} ms</span>
        </div>
        <div className={styles.Metric}>
          <span className={styles.Key}> max: </span>
          <span className={styles.Val}>{max} ms</span>
        </div>
        <div className={styles.Metric}>
          <span className={styles.Key}> min: </span>
          <span className={styles.Val}>{min} ms</span>
        </div>
        {scope.toLowerCase().includes('cell') && (
          <div className={styles.Metric}>
            <span className={styles.Key}> cells: </span>
            <span className={styles.Val}>{extra}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MetricsLog;
