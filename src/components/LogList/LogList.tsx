import MetricsLog from "./MetricsLog";

import useLogs from "../../hooks/useLogs";

import styles from "./LogList.module.css";

function LogList() {
  const { metrics, activeProject } = useLogs();

  return (
    <div className={styles.LogList}>
      {activeProject ? (
        <h2 className={styles.Project}>
          Project: {activeProject && activeProject.toUpperCase()}
        </h2>
      ) : (
        <h2 className={styles.Project}>
          Refresh SCOPE Demo to begin
        </h2>
      )}
      {metrics &&
        activeProject &&
        Object.entries(metrics).map(([scope, metrics]) => {
          return <MetricsLog scope={scope} metrics={metrics} />;
        })}
    </div>
  );
}

export default LogList;
