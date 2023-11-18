import Heading from "@/components/Heading";
import Members from "@/components/Members";
import Recommend from "@/components/Recommend";
import url from "@/configure";
import { divisions } from "@/data";
import axios from "axios";
import React from "react";
import slugify from "slugify";

const course = ({ data, p }) => {
  console.log(data);
  return (
    <>
      <Heading data={p} />

      <Recommend recommended={false} title={"Course For You"} courses={data} />
      <Members />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { program } = query;
  const { data } = await axios.get(`${url}/api/course/program?slug=${program}`);

  const response = await axios.get(`${url}/api/program/${program}`);
  const p = response.data;

  return {
    props: {
      data,
      p,
    },
  };
}

export default course;
