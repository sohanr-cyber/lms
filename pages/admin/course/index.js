import React from "react";
import AdminHeading from "@/components/Admin/AdminHeading";
import Program from "@/components/Admin/Program";
import axios from "axios";
import url from "@/configure";
import Course from "@/components/Admin/Course";

const Admin = ({ data }) => {
  return (
    <>
      <AdminHeading />
      <div style={{ minHeight: "100vh" }}>
        <Course title={"Program"} data={data} />
      </div>
    </>
  );
};

export default Admin;

export async function getServerSideProps() {
  const fetchData = async () => {
    const { data } = await axios.get(`${url}/api/course`);
    return data;
  };

  const data = await fetchData();

  return {
    props: {
      data,
    },
  };
}
