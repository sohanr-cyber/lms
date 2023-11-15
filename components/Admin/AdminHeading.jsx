import React from "react";
import styles from "@/styles/Admin/AdminHeading.module.css";
import Image from "next/image";
import CountUp from "react-countup";
import slugify from "slugify";
import { useRouter } from "next/router";

const data = [
  {
    title: "Division",
    count: "3",
  },
  {
    title: "Program",
    count: "10",
  },
  {
    title: "Course",
    count: "34",
  },
  {
    title: "Content",
    count: "145",
  },
  {
    title: "Sub Content",
    count: "600",
  },
];

const AdminHeading = () => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        {data.map((item, each) => (
          <div
            key={each}
            className={styles.item}
            onClick={() =>
              router.push(`/admin?current=${slugify(item.title.toLowerCase())}`)
            }
          >
            <Image
              src={"https://cdn-icons-png.flaticon.com/128/3352/3352667.png"}
              width="20"
              height="20"
              alt="Logo"
            />
            <div className={styles.right}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.count}>
                <CountUp end={item.count} duration={1.5} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHeading;
