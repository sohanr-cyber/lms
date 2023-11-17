import React, { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Announcement from "./Announcement";
import { useRouter } from "next/router";
import Loading from "@/components/utils/Loading.jsx";
import { useDispatch, useSelector } from "react-redux";
const Layout = ({ children }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.state.loading);

  useEffect(() => {
    if (router.pathname.startsWith("/admin")) {
      userInfo?.user.role != "admin" && router.push("/");
    }
  }, [router.pathname, userInfo]);

  return (
    <>
      {loading && <Loading />}
      <Announcement />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
