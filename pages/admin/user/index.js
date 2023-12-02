import React from "react";
import AdminHeading from "@/components/Admin/AdminHeading";
import axios from "axios";
import url from "@/configure";
import User from "@/components/Admin/User";

const Admin = ({ data }) => {
  return (
    <>
      <AdminHeading />
      <div style={{ minHeight: "100vh" }}>
        <User title={"Users"} data={data} />
      </div>
    </>
  );
};

export default Admin;

export async function getServerSideProps() {
  const fetchData = async () => {
    const { data } = await axios.get(`${url}/api/user`);
    return data;
  };

  const data = await fetchData();

  return {
    props: {
      data,
    },
  };
}
