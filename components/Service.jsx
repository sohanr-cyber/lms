import React from "react";
import styles from "../styles/Services.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import slugify from "slugify";
import { divisions } from "@/data";

const data = [
  {
    title: "English and Literature",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    route: `/faculty/${slugify("Applied Langustic And ELT")}`,
  },
  // {
  //   title: "Cultural Studies",
  //   icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  //   route: `/faculty/${slugify("Cultural Studies")}`,
  // },
  // {
  //   title: "Language Aid",
  //   icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  //   route: `/faculty/${slugify("Language Aid")}`,
  // },
  // {
  //   title: "Enlgish Literature",
  //   icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  //   route: `/faculty/${slugify("Enlgish Literature")}`,
  // },
  {
    title: "General Sciences",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    code: "MBA",
    route: `/faculty/${slugify("General Science (6-12)")}`,
  },
  // {
  //   title: "Bangla Literature and Grammer",
  //   icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  //   code: "MBA",
  //   route: `/faculty/${slugify("Bangla Literature And Grammer")}`,
  // },
  {
    title: "ICT",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    code: "MBA",
    route: `/faculty/${slugify("Information And Technology")}`,
  },
];

const icon = "https://cdn-icons-png.flaticon.com/128/1050/1050453.png";

const Service = () => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <h2>Our Programe at SchoolPress</h2>
      <div className={styles.flex}>
        {[...divisions].map((item, index) => (
          <div
            className={styles.item}
            key={index}
            onClick={() => router.push(`/division/${slugify(item.title)}`)}
          >
            <div className={styles.imageContainer}>
              <Image
                priority
                src={icon}
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
