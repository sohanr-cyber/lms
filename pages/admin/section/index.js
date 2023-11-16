import React from "react";
import AdminHeading from "@/components/Admin/AdminHeading";
import Section from "@/components/Admin/Section";
import axios from "axios";
import url from "@/configure";

const Admin = ({ data }) => {
  return (
    <>
      <AdminHeading />
      <div style={{ minHeight: "100vh" }}>
        <Section title={"Division"} data={data} />
      </div>
    </>
  );
};

export default Admin;

export async function getServerSideProps() {
  const fetchData = async () => {
    const { data } = await axios.get(`${url}/api/division`);
    return data;
  };

  const data = await fetchData();

  return {
    props: {
      data,
    },
  };
}
