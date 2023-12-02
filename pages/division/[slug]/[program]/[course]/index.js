import CourseContent from "@/components/CourseContent";
import Heading from "@/components/Heading";
import url from "@/configure";
import axios from "axios";
import { NextSeo } from "next-seo";
import React from "react";
import { useRouter } from "next/router";
const Course = ({ data, content }) => {
  const router = useRouter();
  return (
    <>
      {" "}
      <NextSeo
        title={data.title}
        description={data.description}
        openGraph={{
          type: "website",
          url: `${url}/${router.query.slug}/${router.query.program}/${router.query.course}`,
          title: data.title,
          description: data.description,
          images: [
            {
              url: data.image,
              width: 1200,
              height: 630,
              alt: data.title,
            },
          ],
        }}
        twitter={{
          handle: "@schoolpress",
          site: "@schoolpress",
          cardType: "summary_large_image",
          title: data.title,
          description: data.description,
          image: data.image,
        }}
      />
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
