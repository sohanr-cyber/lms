import CourseContent from "@/components/CourseContent";
import Heading from "@/components/Heading";
import url from "@/configure";
import axios from "axios";
import React from "react";

const Course = ({ data, content }) => {
  return (
    <>
      <Heading data={data} />
      <CourseContent contents={content} course={data} />
    </>
  );
};

export default Course;

export async function getServerSideProps({ query }) {
  const { course } = query;
  const { data } = await axios.get(`${url}/api/course/${course}`);
  const { data: content } = await axios.get(`${url}/api/content/${data._id}`);

  return {
    props: {
      data,
      content,
    },
  };
}
