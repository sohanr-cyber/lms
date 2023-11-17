import React from "react";
import styles from "../styles/Heading.module.css";
const Heading = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default Heading;
