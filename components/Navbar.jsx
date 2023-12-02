import React, { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import slugify from "slugify";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { AnimatePresence, motion } from "framer-motion";
import { logout } from "@/redux/userSlice";

const routes = [
  { name: "Home", route: "/" },
  {
    name: "Language and Literature Program",
    route: `/division/${slugify(slugify("Language and Literature Program"))}`,
  },
  {
    name: "ICT",
    route: `/division/${slugify("ICT")}`,
  },
  {
    name: "General Science",
    route: `/division/${slugify("General Science")}`,
  },
];

const icon = "https://cdn-icons-png.flaticon.com/128/1050/1050453.png";

const Navbar = ({ section }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [mobileView, setMobileView] = useState(false);
  console.log({ q: router.query.slug });
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo} onClick={() => router.push("/")}>
        SchoolPress
      </div>
      <div className={styles.items}>
        {section.map((item, index) => (
          <div
            className={styles.item}
            key={index}
            onClick={() => router.push(`/division/${item.slug}`)}
            style={router.query.slug == item.slug ? { color: "purple" } : {}}
          >
            {item.title}
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
      <div className={styles.right}>
        {isClient && (
          <>
            <div className={styles.items}>
              {userInfo?.user.role == "admin" && (
                <div onClick={() => router.push("/admin")}>
                  <AdminPanelSettingsIcon />
                </div>
              )}
              {userInfo ? (
                <>
                  {" "}
                  <div className={styles.name}>
                    <Image
                      src={userInfo.user.image}
                      width="35"
                      height="35"
                      alt={userInfo.name}
                    />
                  </div>
                  <div
                    className={styles.logout}
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    <LogoutIcon />
                  </div>
                </>
              ) : (
                <div
                  className={styles.contact}
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className={styles.menuIcon}>
        <MenuIcon
          onClick={() => {
            setMobileView(true);
          }}
        />
      </div>

      {mobileView && (
        <motion.div
          initial={{
            x: "1000px",
          }}
          animate={{ x: "0" }}
          exit={{ x: "0" }}
          transition={{ duration: 1 }}
          className={styles.mobileItems}
        >
          <div className={styles.close}>
            <CloseIcon
              onClick={() => {
                setMobileView(false);
              }}
            />
          </div>
          <div
            className={styles.item}
            onClick={() => router.push("/")}
            style={router.asPath == "/" ? { color: "purple" } : {}}
          >
            Home
          </div>
          {section.map((item, index) => (
            <div
              className={styles.item}
              key={index}
              onClick={() => {
                router.push(`/division/${item.slug}`);
                setMobileView(false);
              }}
              style={router.query.slug == item.slug ? { color: "purple" } : {}}
            >
              {item.title}
            </div>
          ))}

          {!userInfo ? (
            <div
              className={styles.item}
              onClick={() => {
                router.push("/login");
                setMobileView(false);
              }}
            >
              Sign In
            </div>
          ) : (
            <>
              <div
                className={styles.item}
                onClick={() => {
                  dispatch(logout());
                  setMobileView(false);
                }}
              >
                <LogoutIcon />
              </div>
              <div
                className={styles.item}
                onClick={() => {
                  router.push("/admin");
                  setMobileView(false);
                }}
              >
                <AdminPanelSettingsIcon />
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
