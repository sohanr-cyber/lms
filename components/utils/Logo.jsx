import React from "react";
import styles from "@/styles/Utils/Logo.module.css";


const Logo = () => {
  return (
    <div className={styles.logo} onClick={() => router.push("/")}>
      schoolpress
    </div>
  );
};

export default Logo;
