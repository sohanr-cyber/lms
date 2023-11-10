import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import slugify from "slugify";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
const routes = [
  { name: "Home", route: "/" },
  { name: "About", route: "/about" },
  {
    name: "Program",
    route:"/faculty",
    arr: [
      {
        name: "General Science (6-12)",
        route: `/faculty/${slugify("General Science (6-12)")}`,
      },
      {
        name: "Enlgish Literature",
        route: `/faculty/${slugify("Enlgish Literature")}`,
      },
      {
        name: "Cultural Studies",
        route: `/faculty/${slugify("Cultural Studies")}`,
      },
      {
        name: "Applied Langustic And ELT",
        route: `/faculty/${slugify("Applied Langustic And ELT")}`,
      },
      {
        name: "Bangla Literature And Grammer",
        route: `/faculty/${slugify("Bangla Literature And Grammer")}`,
      },
      {
        name: "Information And Technology",
        route: `/faculty/${slugify("Information And Technology")}`,
      },
    ],
  },
];

const icon = "https://cdn-icons-png.flaticon.com/128/1050/1050453.png";

const Navbar = () => {
  const router = useRouter();
  const [mobileView, setMobileView] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo} onClick={() => router.push("/")}>
        SchoolPress
      </div>
      <div className={styles.items}>
        {routes.map((item, index) => (
          <div
            className={styles.item}
            key={index}
            onClick={() => router.push(item.route)}
            style={{ display: "flex", alignItems: "flex-start" }}
          >
            {item.name}
            {/* {item.arr && <KeyboardArrowDownIcon style={{ fontSize: "100%" }} />}
            {item.arr && (
              <div className={styles.more}>
                {item.arr.map((e, i) => (
                  <div className={styles.each} key={index}>
                    <Image src={icon} alt="" width="15" height="15\" />
                    <span>{e.name}</span>
                  </div>
                ))}
              </div>
            )} */}
          </div>
        ))}
      </div>
      <div className={styles.contact}>Contact Us</div>
      <div className={styles.menuIcon}>
        <MenuIcon
          onClick={() => {
            setMobileView(true);
          }}
        />
      </div>

      {mobileView && (
        <>
          <div className={styles.mobileItems}>
            <div className={styles.close}>
              <CloseIcon
                onClick={() => {
                  setMobileView(false);
                }}
              />
            </div>
            {routes.map((item, index) => (
              <div
                className={styles.item}
                key={index}
                onClick={() => router.push(item.route)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
