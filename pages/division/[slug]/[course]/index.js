import Faculty from "@/components/Faculty";
import Heading from "@/components/Heading";
import Members from "@/components/Members";
import Recommend from "@/components/Recommend";
import { divisions } from "@/data";
import React from "react";
import slugify from "slugify";

const faculty = ({ query }) => {
  const data = divisions
    .find((item) => slugify(item.title) == query.slug)
    .programs?.find((item) => slugify(item.title) == query.course);

  console.log(data);
  return (
    <>
      {/* <Heading title={data.title} /> */}
      <Recommend
        recommended={false}
        title={"Course For You"}
        courses={data.courses}
      />

      <Members />
    </>
  );
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    },
  };
}
export default faculty;
