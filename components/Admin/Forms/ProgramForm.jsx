import React from "react";
import styles from "@/styles/Form.module.css";
import { useRouter } from "next/router";
import { divisions } from "@/data";
const ProgramForm = () => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <h1>Create A Program</h1>
      <form>
        <label>Select Division</label>
        <select id="cars" name="cars">
          {divisions.map((item, index) => (
            <option value={item.title} key={index}>
              {item.title}
            </option>
          ))}
        </select>
        <label>Name / Title</label>
        <input type="text" placeholder="Name/Title" />
        <textarea placeholder="Description" />
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

export default ProgramForm;
