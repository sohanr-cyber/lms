import CourseContent from "@/components/CourseContent";
import Heading from "@/components/Heading";
import React from "react";

const tableOfContents = [
  {
    title: "Introduction to Programming",
    subSections: [
      "What Is Programming?",
      "Why Learn Programming?",
      "Types of Programming Languages",
    ],
  },
  {
    title: "Getting Started",
    subSections: [
      "Setting Up Your Development Environment",
      "Your First Program",
      "Understanding How Programs Work",
      "Debugging and Troubleshooting",
    ],
  },
  {
    title: "Basic Programming Concepts",
    subSections: [
      "Variables and Data Types",
      "Operators and Expressions",
      "Control Structures (if, else, loops)",
      "Functions and Modular Programming",
    ],
  },
  {
    title: "Data and Data Structures",
    subSections: [
      "Arrays and Lists",
      "Strings and Text Manipulation",
      "Dictionaries and Hash Tables",
    ],
  },
  {
    title: "Object-Oriented Programming",
    subSections: [
      "Introduction to Objects and Classes",
      "Inheritance and Polymorphism",
      "Encapsulation and Abstraction",
    ],
  },
  {
    title: "File Handling and Input/Output",
    subSections: ["Reading and Writing Files", "User Input and Output"],
  },
  {
    title: "Error Handling and Exceptions",
    subSections: ["Dealing with Errors", "Handling Exceptions"],
  },
  {
    title: "Algorithm Design",
    subSections: [
      "Understanding Algorithms",
      "Common Algorithmic Concepts",
      "Algorithm Efficiency and Big O Notation",
    ],
  },
  {
    title: "Introduction to Data Structures",
    subSections: ["Stacks and Queues", "Linked Lists", "Trees and Graphs"],
  },
  {
    title: "Version Control and Collaboration",
    subSections: [
      "Using Version Control Systems",
      "Collaborative Coding and Git",
    ],
  },
  {
    title: "Best Practices and Coding Standards",
    subSections: ["Writing Clean and Readable Code", "Code Documentation"],
  },
];
const Course = () => {
  return (
    <>
      <Heading title={"Introduction to programming"} />
      <CourseContent data={tableOfContents} />
    </>
  );
};

export default Course;
