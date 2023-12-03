import React from "react";
import styles from "@/styles/Announcement.module.css";
import Link from "next/link";
const Announcement = () => {
  return (
    <div className={styles.wrapper}>
      This Site is Under development By &nbsp;
      <Link
        href="https://kiwicode.vercel.app/"
        style={{
          color: "gold",
          fontWeight: "bold",
          fontSize: "120%",
          borderBottom: "3px solid blue",
          padding: "2px",
        }}
      >
        Quince Tech
      </Link>
    </div>
  );
};

export default Announcement;
