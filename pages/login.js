import React from "react";
import styles from "../styles/Auth/Login.module.css";
const login = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <form>
          <input type="Email" placeholder="Enter Admin password" />
          <input type="password" placeholder="Enter Admin password" />
          <div className={styles.btn}>Login</div>
        </form>
      </div>
    </div>
  );
};

export default login;
