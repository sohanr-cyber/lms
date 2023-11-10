import Program from "@/components/Admin/Program";
import React from "react";
import slugify from "slugify";
import { divisions } from "@/data";
const data = [
  {
    title: "Applied Langustic And  ELT",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    route: `/faculty/${slugify("Applied Langustic And ELT")}`,
  },
  {
    title: "Cultural Studies",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    route: `/faculty/${slugify("Cultural Studies")}`,
  },
  {
    title: "Language Aid",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    route: `/faculty/${slugify("Language Aid")}`,
  },
  {
    title: "Enlgish Literature",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    route: `/faculty/${slugify("Enlgish Literature")}`,
  },
  {
    title: "General Science class (6-12)",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    code: "MBA",
    route: `/faculty/${slugify("General Science (6-12)")}`,
  },
  {
    title: "Bangla Literature and Grammer",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    code: "MBA",
    route: `/faculty/${slugify("Bangla Literature And Grammer")}`,
  },
  {
    title: "Information And Technology",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
    code: "MBA",
    route: `/faculty/${slugify("Information And Technology")}`,
  },
];

const peopleData = [
  {
    title: "John Doe",
    rank: "Captain",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  },
  {
    title: "Jane Smith",
    rank: "Lieutenant",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  },
  {
    title: "Bob Johnson",
    rank: "Sergeant",
    icon: "https://cdn-icons-png.flaticon.com/128/1050/1050453.png",
  },
  // Add more objects as needed
];

const admin = () => {
  return (
    <div style={{ minHeight: "400px" }}>
      <Program title={"Division"} data={divisions} />
      <Program title={"Program"} data={data} />
      <Program title={"Course"} data={data} />
      <Program title={"Member"} data={peopleData} member={"true"} />
    </div>
  );
};

export default admin;
