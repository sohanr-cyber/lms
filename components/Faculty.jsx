import Image from "next/image";
import React from "react";
import styles from "../styles/Faculty.module.css";
import slugify from "slugify";
const icon = "https://cdn-icons-png.flaticon.com/128/1050/1050453.png";

import { useRouter } from "next/router";
const Faculty = ({ data, background, program, title }) => {
  const router = useRouter();
  return (
    <div
      className={styles.wrapper}
      style={
        background
          ? {
              background: "#F1EAFF",
            }
          : {}
      }
    >
      <h1>{title}</h1>
      <div className={styles.flex}>
        {data?.map((item, index) => (
          <div
            className={styles.item}
            key={index}
            onClick={() =>
              router.push(
                `/division/${router.query.slug}/${slugify(item.title)}`
              )
            }
          >
            <Image
              priority
              src={icon}
              width={50}
              height={50}
              alt={item.title}
            />
            <div className={styles.title}>{item.title}</div>
            {/* <div className={styles.code}>({item.code})</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculty;
