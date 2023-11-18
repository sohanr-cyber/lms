import React from "react";
import styles from "@/styles/Faculty.module.css";
import Heading from "@/components/Heading";
import { divisions } from "@/data";
import slugify from "slugify";
import axios from "axios";
import url from "@/configure";
import Programs from "@/components/Programs";

const program = ({ data, programs }) => {
  return (
    <div>
      <Heading data={data} />
      <Programs data={programs} />
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const { slug } = query;

  const fetchData = async () => {
    const { data } = await axios.get(`${url}/api/division/${slug}`);
    return data;
  };

  const fetchPrograms = async (division) => {
    console.log({ division });
    const { data } = await axios.get(
      `${url}/api/program/division?division=${division._id}`
    );
    return data;
  };

  const data = await fetchData();
  const programs = await fetchPrograms(data);

  return {
    props: {
      data,
      programs,
    },
  };
}

export default program;
