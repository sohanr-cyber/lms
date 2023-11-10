import React from "react";
import styles from "../styles/Faculty.module.css";
import Heading from "@/components/Heading";
import Faculty from "@/components/Faculty";

const data = [
  {
    title: "Cultural Studies",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  },
  {
    title: "Environementa science",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  },
  {
    title: "Spoken English And Phonetics",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  },
  {
    title: "International Law",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    code: "MBA",
  },
  {
    title: "Linguistic",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  },
];


const faculty = () => {
  return (
    <div>
      <Heading title={"Internationa Programme "} />
      <Faculty data={data} />
    </div>
  );
};

export default faculty;
