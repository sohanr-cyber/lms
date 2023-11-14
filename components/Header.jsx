import React from "react";
import styles from "../styles/Header.module.css";
import Image from "next/image";
const images = [
  "https://www.pexels.com/photo/kid-on-white-table-painting-3662630/",
  "https://images.pexels.com/photos/8613319/pexels-photo-8613319.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/4126743/pexels-photo-4126743.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const data = [
  {
    title: "Explore Limitless Possibilities",
    content:
      "Dive into a vast array of courses spanning various disciplines, tailored to meet the needs of every learner.",
  },
  {
    title: "Expert-Led Instruction",
    content:
      "Experience education like never before with our innovative tools and interactive content, designed to make learning engaging and effective",
  },
  {
    title: "Interactive Learning Tools",
    content:
      "Experience education like never before with our innovative tools and interactive content, designed to make learning engaging and effective.",
  },
  {
    title: "Global Learning Community",
    content:
      " Connect with like-minded individuals from around the world. Engage in discussions, collaborate on projects, and broaden your horizons.",
  },
];
import { useRouter } from "next/router";

const randomIndex = Math.floor(Math.random() * images.length);
console.log({ randomIndex });

const Header = () => {
  const router = useRouter();
  console.log(router.query.code);

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundImage: `url(${images[randomIndex]})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1>Your Learning Journey Begins Here!</h1>
      <h2>Empower Yourself through Education</h2>
      {/* <p>
        At SchoolPress, we believe in the power of education to transform lives
        and shape a brighter future. Our platform is your gateway to a world of
        learning, offering a diverse range of courses, cutting-edge resources,
        and a vibrant community of learners
      </p> */}
      <div className={styles.flex}>
        {data.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.imageContainer}>
              <Image
                src="https://cdn-icons-png.flaticon.com/128/1040/1040254.png"
                width="35"
                height="35"
                alt=""
              />
            </div>
            <div className={styles.title}>{item.title}</div>
          </div>
        ))}
      </div>
      <div className={styles.circle}>
        <div className={styles.innerCircle}></div>
      </div>
    </div>
  );
};

export default Header;
