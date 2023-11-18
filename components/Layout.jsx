import React, { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Announcement from "./Announcement";
import { useRouter } from "next/router";
import Loading from "@/components/utils/Loading.jsx";
import { useDispatch, useSelector } from "react-redux";
const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.state.loading);

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
