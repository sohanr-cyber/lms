import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import slugify from "slugify";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import { divisions } from "@/data";
const routes = [
  { name: "Home", route: "/" },
  ...divisions.map((item) => ({
    name: item.title,
    route: `/division/${slugify(item.title)}`,
  })),
  { name: "Admin", route: "/admin" },
];

const icon = "https://cdn-icons-png.flaticon.com/128/1050/1050453.png";

const Navbar = () => {
  const router = useRouter();
  const [mobileView, setMobileView] = useState(false);
  console.log({ q: router.query.slug });
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
            style={
              router.query.slug == slugify(item.name) ? { color: "purple" } : {}
            }
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
                style={
                  router.query.slug == slugify(item.name)
                    ? { color: "purple" }
                    : {}
                }
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
