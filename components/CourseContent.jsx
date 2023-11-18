import React, { useState } from "react";
import styles from "@/styles/CourseContent.module.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InnerContnet from "./InnerContnet";

const CourseContent = ({ data, course }) => {
  const router = useRouter();
  const [open, setOpen] = useState({});

  return (
    <div className={styles.wrapper}>
      <div className={styles.space}>
        <h2>Table Of Content</h2>
        <div
          className={styles.new}
          onClick={() =>
            router.push(`/admin/content/form?course=${course._id}`)
          }
        >
          +
        </div>
      </div>
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
              <div className={styles.icons}>
                <div
                  className={styles.new}
                  onClick={() =>
                    router.push(
                      `/admin/content/form?course=${course._id}&content=${item._id}`
                    )
                  }
                >
                  +
                </div>
                <div
                  className={styles.play}
                  onClick={() => (open == item ? setOpen(null) : setOpen(item))}
                >
                  <KeyboardArrowDownIcon />
                </div>
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
