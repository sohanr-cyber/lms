import React from "react";
import styles from "../styles/Recommend.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import slugify from "slugify";

const data = [
  {
    title: "Introduction To Programming",
    icon: "https://images.pexels.com/photos/5496461/pexels-photo-5496461.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    title: "Learn Python In 30 days",
    icon: "https://images.pexels.com/photos/19055277/pexels-photo-19055277/free-photo-of-a-woman-reading-a-book-in-a-dark-room.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
  },
  {
    title: "General Physics (11-12)",
    icon: "https://images.pexels.com/photos/714698/pexels-photo-714698.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    title: "Enlgish Literature",
    icon: "https://images.pexels.com/photos/261859/pexels-photo-261859.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const Recommend = ({ recommended, title, background }) => {
  const router = useRouter();
  return (
    <div
      className={styles.wrapper}
      style={background ? { background: background } : {}}
    >
      <h2>{title}</h2>
      <div className={styles.flex}>
        {[...data].map((item, index) => (
          <div
            className={styles.item}
            key={index}
            onClick={() =>
              router.push(
                `/faculty/${slugify(item.title)}/${slugify(item.title)}`
              )
            }
            style={{
              backgroundImage: `url(${item.icon})`,
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
