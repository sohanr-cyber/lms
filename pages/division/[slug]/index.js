import React from "react";
import styles from "@/styles/Faculty.module.css";
import Heading from "@/components/Heading";
import Faculty from "@/components/Faculty";
import { divisions } from "@/data";
import slugify from "slugify";

const program = ({ query }) => {
  console.log(query);

  console.log(divisions.find((item) => slugify(item.title) == query.slug));

  return (
    <div>
      <Heading
        title={
          divisions.find((item) => slugify(item.title) == query.slug).title
        }
      />
      <Faculty
        data={
          divisions.find((item) => slugify(item.title) == query.slug).programs
        }
        title={
          divisions.find((item) => slugify(item.title) == query.slug).title
        }
      />
    </div>
  );
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    },
  };
}

export default program;
