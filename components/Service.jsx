import React from "react";
import styles from "../styles/Services.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import slugify from "slugify";

const data = [
  {
    title: "Applied Langustic And  ELT",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    route: `/faculty/${slugify("Applied Langustic And ELT")}`,
  },
  {
    title: "Cultural Studies",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    route: `/faculty/${slugify("Cultural Studies")}`,
  },
  {
    title: "Language Aid",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    route: `/faculty/${slugify("Language Aid")}`,
  },
  {
    title: "Enlgish Literature",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    route: `/faculty/${slugify("Enlgish Literature")}`,
  },
  {
    title: "General Science class (6-12)",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    code: "MBA",
    route: `/faculty/${slugify("General Science (6-12)")}`,
  },
  {
    title: "Bangla Literature and Grammer",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    code: "MBA",
    route: `/faculty/${slugify("Bangla Literature And Grammer")}`,
  },
  {
    title: "Information And Technology",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    code: "MBA",
    route: `/faculty/${slugify("Information And Technology")}`,
  },
];

const Service = () => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <h2>Our Programe at SchoolPress</h2>
      <div className={styles.flex}>
        {[...data].map((item, index) => (
          <div
            className={styles.item}
            key={index}
            onClick={() => router.push(item.route)}
          >
            <div className={styles.imageContainer}>
              <Image
                priority
                src={item.icon}
                width={50}
                height={50}
                alt={item.title}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.details}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
