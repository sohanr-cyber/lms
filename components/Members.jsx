import React from "react";
import styles from "@/styles/Members.module.css";
import Image from "next/image";

const Members = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Faculty Members</h2>
      <div className={styles.flex}>
        {[1, 2, 3, 4, 4, 5].map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.imageContainer}>
              {" "}
              <Image
                src={"https://cdn-icons-png.flaticon.com/128/3048/3048122.png"}
                width={100}
                height={100}
                alt={"Faculty Memeber"}
              />
            </div>

            <div className={styles.right}>
              {" "}
              <div className={styles.name}>Sed ut perspiciatis</div>
              <div className={styles.rank}>Senior Lecturer & Coordinator</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
