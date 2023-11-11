import React from "react";
import styles from "@/styles/Form.module.css";
import { useRouter } from "next/router";
const Form = () => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <h1>Create A Divsion</h1>
      <form>
        <label>Name / Title</label>
        <input type="text" />
        <label>Description</label>
        <textarea />
        <label>Upload Logo</label>
        <input type="file" />
        <div className={styles.flex}>
          <div className={styles.btn}>Submit</div>
          <div className={styles.btn} onClick={() => router.push("/admin")}>
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
