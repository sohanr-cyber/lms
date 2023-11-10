import React from "react";
import styles from "@/styles/Faculty.module.css";
import Heading from "@/components/Heading";
import Faculty from "@/components/Faculty";
const data = [
  {
    title: "Applied Langustic and ELT",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    route: "/",
  },
  {
    title: "Cultural Studies",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  },
  {
    title: "Languag Aid",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  },
  {
    title: "Enlgish Literature",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  },
  {
    title: "General Science class (6-12)",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    code: "MBA",
  },
  {
    title: "Bangla Literature and Grammer",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    code: "MBA",
  },
  {
    title: "ICT",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    code: "MBA",
  },
];
const divisions = () => {
  return (
    <div>
      <Heading title={"Faculty"} />
      <Faculty data={data} title={"Program We Offer"} />
    </div>
  );
};

export default divisions;
