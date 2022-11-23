import React from "react";

import styles from "./Header.module.css";

import scopeLogo from "../../../assets/logo_scope.svg"


function Header(){

  return (
    <div className={styles.Header}>
      <img className={styles.Logo} src={scopeLogo} alt='app logo'/>
      <span className={styles.Caption}>Diagnostic Log</span>
    </div>
  );

}

export default Header;