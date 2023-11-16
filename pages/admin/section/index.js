import Program from "@/components/Admin/Program";
import React from "react";
import slugify from "slugify";
import { divisions } from "@/data";
import AdminHeading from "@/components/Admin/AdminHeading";

import { useRouter } from "next/router";
import Section from "@/components/Admin/Section";
import axios from "axios";
import url from "@/configure";


const Admin = ({ data }) => {
  const router = useRouter();
  const current = router.query.current;
  return (
    <>
      <AdminHeading />
      <div style={{ minHeight: "400px" }}>
        <Section title={"Division"} data={data} />
      </div>
    </>
  );
};

export default Admin;

export async function getServerSideProps({ query }) {
  const { slug } = query;

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
