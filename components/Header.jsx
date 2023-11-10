import React from "react";
import styles from "../styles/Header.module.css";
const images = [
  "https://www.pexels.com/photo/kid-on-white-table-painting-3662630/",
  "https://images.pexels.com/photos/8613319/pexels-photo-8613319.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/4126743/pexels-photo-4126743.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const randomIndex = Math.floor(Math.random() * images.length);
console.log({ randomIndex });
const Header = () => {
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
      {" "}
      Header
    </div>
  );
};

export default Header;
