import Faculty from "@/components/Faculty";
import Heading from "@/components/Heading";
import Members from "@/components/Members";
import Recommend from "@/components/Recommend";
import React from "react";

const data = [
  {
    title: "Introuction To Programming",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  },
  {
    title: "Python Programming",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  },
  {
    title: "HTML , SQL , C++",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  },
  {
    title: "Enlgish Literature",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  },
  {
    title: "Learn NextJs , ReactJs",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    code: "MBA",
  },
  {
    title: "Mobile App Development",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    code: "MBA",
  },
];

const faculty = () => {
  return (
    <>
      <Heading title={"Faculty - ICT"} />
      <Recommend recommended={false} title={"Course For You"} />

      <Members />
    </>
  );
};

export default faculty;
