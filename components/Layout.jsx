import React, { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Announcement from "./Announcement";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const Layout = ({ children }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    if (router.pathname.startsWith("/admin")) {
      userInfo?.user.role != "admin" && router.push("/");
    }
  }, [router.pathname, userInfo]);

  return (
    <>
      {" "}
      <Announcement />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
