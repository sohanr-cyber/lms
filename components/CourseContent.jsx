import React, { useState } from "react";
import styles from "@/styles/CourseContent.module.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InnerContnet from "./InnerContnet";
const CourseContent = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState({});

  return (
    <div className={styles.wrapper}>
      <h2>Table Of Content</h2>
      <div className={styles.flex}>
        {data.map((item, index) => (
          <>
            <div
              className={styles.item}
              key={index}
              style={
                index % 2 == 0
                  ? {
                      background: "purple",
                      color: "white",
                    }
                  : { background: "white" }
              }
            >
              <div className={styles.title}>
                {index + 1}.{item.title}
              </div>
              <div
                className={styles.play}
                onClick={() => (open == item ? setOpen(null) : setOpen(item))}
              >
                <KeyboardArrowDownIcon />
              </div>
            </div>
            {open == item && (
              <div className={styles.details}>
                <InnerContnet
                  data={item.subSections}
                  background={index % 2 == 0 ? true : null}
                />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;