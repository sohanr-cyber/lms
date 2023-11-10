import Image from "next/image";
import React from "react";
import styles from "../styles/Faculty.module.css";
import slugify from "slugify";

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
        {data.map((item, index) => (
          <div
            className={styles.item}
            key={index}
            onClick={() =>
              program
                ? router.push(
                    `/faculty/${slugify(item.title)}/${slugify(item.title)}`
                  )
                : router.push(`/faculty/${slugify(item.title)}`)
            }
          >
            <Image
              priority
              src={item.icon}
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
