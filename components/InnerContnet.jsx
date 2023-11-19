import React, { useEffect, useState } from "react";
import styles from "../styles/InnerContent.module.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useRouter } from "next/router";
import axios from "axios";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";

const InnerContnet = ({ background, content, description, contentId }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const userInfo = useSelector((state) => state.user.userInfo);

  const fetch = async () => {
    try {
      const { data } = await axios.get(`/api/subContent/${content}`);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, [router.query.content]);

  const handleDelete = async (item) => {
    try {
      const { data } = await axios.delete(
        `/api/subContent/single?subContentId=${item._id}&content=${content}`,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      fetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={styles.wrapper}
      // style={background ? { background: "violet", color: "white" } : {}}
    >
      <div className={styles.summary}>{description}</div>
      <div className={styles.flex}>
        {data.length > 0 &&
          data.map((item, index) => (
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
              <div className={styles.title}>{item.title}</div>

              <div className={styles.right}>
                <CreateIcon
                  onClick={() =>
                    router.push(
                      `/admin/subContent/form?subContentId=${item._id}&content=${content}`
                    )
                  }
                />
                <DeleteIcon onClick={() => handleDelete(item)} />
                {item.link && (
                  <PlayCircleIcon
                    onClick={() =>
                      router.push(
                        "https://www.facebook.com/watch/?v=336687492379445&extid=CL-UNK-UNK-UNK-AN_GK0T-GK1C&ref=sharing&mibextid=h7HYfJ"
                      )
                    }
                  />
                )}

                {item.pdf && <PictureAsPdfIcon />}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default InnerContnet;
