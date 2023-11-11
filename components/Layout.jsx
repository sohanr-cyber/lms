import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Announcement from "./Announcement";

const Layout = ({ children }) => {
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
