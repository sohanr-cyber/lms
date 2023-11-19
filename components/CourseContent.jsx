import React, { useEffect, useState } from "react";
import styles from "@/styles/CourseContent.module.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InnerContnet from "./InnerContnet";
import axios from "axios";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

const CourseContent = ({ contents, course }) => {
  const router = useRouter();
  const [open, setOpen] = useState({});
  console.log(router);
  const [data, setData] = useState([...contents]);
  const userInfo = useSelector((state) => state.user.userInfo);
  const fetchContent = async () => {
    try {
      const { data } = await axios.get(`/api/content/${course._id}`);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (content) => {
    try {
      const { data } = await axios.delete(
        `/api/content?id=${content._id}&course=${course._id}`,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      if (data) {
        fetchContent();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <AddIcon />
        </div>
      </div>
      <div className={styles.flex}>
        {data.map((item, index) => (
          <>
            <div
              className={styles.item}
              key={index}
              // style={
              //   index % 2 == 0
              //     ? {
              //         background: "purple",
              //         color: "white",
              //       }
              //     : { background: "white" }
              // }
            >
              <div className={styles.title}>
                {index + 1}.{item.title}
              </div>
              <div className={styles.icons}>
                <div
                  className={styles.icon}
                  onClick={() =>
                    router.push(`/admin/subContent/form?content=${item._id}`)
                  }
                >
                  <AddIcon />
                </div>
                <div
                  className={styles.icon}
                  onClick={() =>
                    router.push(
                      `/admin/content/form?course=${course._id}&content=${item._id}`
                    )
                  }
                >
                  <CreateIcon />
                </div>

                <div className={styles.icon} onClick={() => handleDelete(item)}>
                  <DeleteIcon />
                </div>
                <div
                  className={styles.play}
                  // onClick={() => (open == item ? setOpen(null) : setOpen(item))}
                  onClick={() => {
                    router.query.content == item._id
                      ? router.push(
                          `/${router.asPath.split("?")[0]}`,
                          undefined,
                          { shallow: true }
                        )
                      : router.push(
                          `/${router.asPath.split("?")[0]}?content=${item._id}`
                        );
                  }}
                >
                  <KeyboardArrowDownIcon />
                </div>
              </div>
            </div>
            {router.query.content == item._id && (
              <div className={styles.details}>
                <InnerContnet
                  content={router.query.content}
                  background={index % 2 == 0 ? true : null}
                  description={item.description}
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
