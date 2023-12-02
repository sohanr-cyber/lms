import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Announcement from "./Announcement";
import { useRouter } from "next/router";
import Loading from "@/components/utils/Loading.jsx";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./Chat";
import axios from "axios";
import { section as s } from "@/data";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.state.loading);
  const [section, setSection] = useState(s);

  const fetch = async () => {
    try {
      const { data } = await axios.get("/api/division");
      setSection(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Announcement />
      <Navbar section={section} />
      {children}
      <Chat />
      <Footer section={section} />
    </>
  );
};

export default Layout;
