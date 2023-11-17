import React, { useEffect, useState } from "react";
import styles from "../../styles/Admin/Table.module.css";
import slugify from "slugify";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { finishLoading, startLoading } from "@/redux/stateSlice";

const icon = "https://cdn-icons-png.flaticon.com/128/1050/1050453.png";

const Program = ({ title, data }) => {
  const router = useRouter();
  const [list, setList] = useState(data);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const fetchProgram = async () => {
    try {
      const { data } = await axios.get("/api/program");
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAction = async (id) => {
    try {
      dispatch(startLoading());

      const { data } = await axios.delete(`/api/program?id=${id}`, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      if (data) {
        fetchProgram();
      }
      dispatch(finishLoading());
    } catch (error) {
      dispatch(finishLoading());

      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <h2>{title}</h2>
        <h2
          div
          className={styles.new}
          onClick={() => router.push("/admin/program/form?new=true")}
        >
          +
        </h2>
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>
                  {item.description && item.description.length > 50
                    ? `${item.description.substring(0, 50)}...`
                    : item.description}
                </td>
                <td style={{ textAlign: "center" }}>
                  <Image
                    src={item.image}
                    width="30"
                    height="30"
                    alt={item.title}
                  />
                </td>

                <td
                //   style={{
                //     display: "flex",
                //     gap: "15px",
                //     justifyContent: "space-evenly",
                //   }}
                >
                  {/* Add your action button or link here */}
                  <div className={styles.btn}>
                    <span
                      onClick={() =>
                        router.push(
                          `/admin/program/form?slug=${slugify(item.slug)}`
                        )
                      }
                    >
                      Update
                    </span>
                    <span onClick={() => handleDeleteAction(item._id)}>
                      Delete
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Program;
