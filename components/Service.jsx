import React from "react";
import styles from "../styles/Services.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import slugify from "slugify";
import { divisions } from "@/data";
import Logo from "./utils/Logo";

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

const Service = ({ data }) => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <h2>What We Offer Here</h2>
      <div className={styles.flex}>
        {[...data].map((item, index) => (
          <div
            className={styles.item}
            key={index}
            onClick={() => router.push(`/division/${slugify(item.title)}`)}
          >
            <div className={styles.imageContainer}>
              <Image
                priority
                src={item.image}
                width={50}
                height={50}
                alt={item.title}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.details}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
