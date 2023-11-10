import React from "react";
import styles from "../styles/Recommend.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import slugify from "slugify";

const icon =
  "https://images.pexels.com/photos/5496461/pexels-photo-5496461.jpeg?auto=compress&cs=tinysrgb&w=400";

const Recommend = ({ recommended, title, background, courses }) => {
  const router = useRouter();
  return (
    <div
      className={styles.wrapper}
      style={background ? { background: background } : {}}
    >
      <h2>{title}</h2>
      <div className={styles.flex}>
        {courses?.map((item, index) => (
          <div
            className={styles.item}
            key={index}
            onClick={() =>
              router.push(
                `/faculty/${slugify(item.title)}/${slugify(item.title)}`
              )
            }
            style={{
              backgroundImage: `url(${icon})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* <Image
              priority
              src={item.icon}
              width={50}
              height={50}
              alt={item.title}
            /> */}
            <div className={styles.title}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
