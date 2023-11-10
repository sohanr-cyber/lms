import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Service from "@/components/Service";
import Recommend from "@/components/Recommend";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <Service />
      <Recommend recommended={"true"} title="Recommended Course For You" />
      <Recommend
        recommended={false}
        title={"Popular  Course For HSC & SSC"}
        background={"lightblue"}
      />
      <Recommend
        recommended={false}
        title={"Popular ICT Course For You"}
        background={"lightgrey"}
      />

      <Recommend
        recommended={false}
        title={"Popular English Literature Course For You"}
        background={"skyblue"}
      />
    </>
  );
}
