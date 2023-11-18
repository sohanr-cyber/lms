import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Service from "@/components/Service";
import Recommend from "@/components/Recommend";
import axios from "axios";
import url from "@/configure";
import { NextSeo } from "next-seo";

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

const site = "https://schoolpress.vercel.app/";
const title = "Schoolpress - Your Learning Journey Begins Here!";
const description =
  "SchoolPress, the leading online Learning Management System (LMS) empowering educators and learners. Explore interactive courses, analytics, and collaborative tools for a holistic learning experience.";
export default function Home({ data, recommended, popular }) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: "website",
          url: site,
          title: title,
          description: description,
          images: [
            {
              url: "/images/schoolpress.png",
              width: 1200,
              height: 630,
              alt: "schoolpress",
            },
          ],
        }}
        twitter={{
          handle: "@schoolpress",
          site: "@schoolpress",
          cardType: "summary_large_image",
          title: title,
          description: description,
          image: "/images/schoolpress.png",
        }}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Quince",
          legalName: "Quince Software Solutions, Inc.",
          url: "https://www.Quince.com",
          logo: "https://www.Quince.com/Quince.jpg",
          foundingDate: "Year Founded",
          sameAs: [
            "https://www.facebook.com/schoolpress",
            "https://twitter.com/schoolpress",
            "https://www.linkedin.com/company/schoolpreses",
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 Main Street",
            addressLocality: "City",
            addressRegion: "State",
            postalCode: "ZIP Code",
            addressCountry: "Country",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-123-456-7890",
            contactType: "customer service",
          },
          description: description,
        }}
      />
      <Header />
      <Service data={data} />
      <Recommend
        recommended={"true"}
        title="Recommended Course For You"
        courses={recommended}
      />
      <Recommend
        recommended={false}
        title={"Popular  Course For HSC & SSC"}
        background={"lightblue"}
        courses={popular}
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

export async function getServerSideProps() {
  const fetchData = async () => {
    const { data } = await axios.get(`${url}/api/division`);
    return data;
  };

  const fetchRecommended = async () => {
    const { data } = await axios.get(`${url}/api/course/recommended`);
    return data;
  };

  const fetchPopular = async () => {
    const { data } = await axios.get(`${url}/api/course/popular`);
    return data;
  };

  const data = await fetchData();
  const recommended = await fetchRecommended();
  const popular = await fetchPopular();

  return {
    props: {
      data,
      recommended,
      popular,
    },
  };
}
