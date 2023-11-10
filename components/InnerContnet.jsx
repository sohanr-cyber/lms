import React from "react";
import styles from "../styles/InnerContent.module.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
const InnerContnet = ({ data, background }) => {
  return (
    <div
      className={styles.wrapper}
      style={background ? { background: "purple", color: "white" } : {}}
    >
      <div className={styles.summary}>
        Get acquainted with how the web works! Learn about your browser, the
        internet, and a filetype called HTML. HTML stands for Hypertext Markup
        Language. HTML is the language used to create webpages. Learn the basics
        of HTML to create a simple web page!
      </div>
      <div className={styles.flex}>
        {data.map((item, index) => (
          <div
            className={styles.item}
            key={index}
            style={
              index % 2 == 0
                ? {
                    background: "rgb(204, 216, 248, 0.5)",
                  }
                : {}
            }
          >
            <div className={styles.title}>{item}</div>
            {/* <div className={styles.gain}>
              In this lesson, well introduce you to your instructors, give you
              an overview of what youll be learning, and tell you how to get
              help and support when you need it.
            </div> */}
            <div className={styles.right}>
              <PlayCircleIcon />
              <PictureAsPdfIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InnerContnet;
