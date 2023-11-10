import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Service from "@/components/Service";
import Recommend from "@/components/Recommend";

const inter = Inter({ subsets: ["latin"] });

const courses = [
  {
    title: "Introduction To Programming",
    icon: "https://images.pexels.com/photos/5496461/pexels-photo-5496461.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    title: "Learn Python In 30 days",
    icon: "https://images.pexels.com/photos/19055277/pexels-photo-19055277/free-photo-of-a-woman-reading-a-book-in-a-dark-room.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
  },
  {
    title: "General Physics (11-12)",
    icon: "https://images.pexels.com/photos/714698/pexels-photo-714698.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    title: "Enlgish Literature",
    icon: "https://images.pexels.com/photos/261859/pexels-photo-261859.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <Service />
      <Recommend
        recommended={"true"}
        title="Recommended Course For You"
        courses={courses}
      />
      <Recommend
        recommended={false}
        title={"Popular  Course For HSC & SSC"}
        background={"lightblue"}
        courses={courses}
      />
      <Recommend
        recommended={false}
        title={"Popular ICT Course For You"}
        background={"lightgrey"}
        courses={courses}
      />

      <Recommend
        recommended={false}
        title={"Popular English Literature Course For You"}
        background={"skyblue"}
        courses={courses}
      />
    </>
  );
}
