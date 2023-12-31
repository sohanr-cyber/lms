import React, { useEffect, useState } from "react";
import styles from "../../styles/Admin/Table.module.css";
import slugify from "slugify";
import Image from "next/image";
import { useRouter } from "next/router";

import axios from "axios";
import { useSelector } from "react-redux";

const icon = "https://cdn-icons-png.flaticon.com/128/1050/1050453.png";

const Section = ({ title, data }) => {
  const router = useRouter();
  const [list, setList] = useState(data);
  const [openForm, setOpenForm] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const handleAction = () => {
    return;
  };

  const fetchSection = async () => {
    try {
      const { data } = await axios.get("/api/division");
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAction = async (id) => {
    try {
      const { data } = await axios.delete(`/api/division?id=${id}`, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      if (data) {
        fetchSection();
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(router.query);
  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <h2>{title}</h2>
        <h2
          div
          className={styles.new}
          onClick={() => router.push("/admin/section/form?new=true")}
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

                <td>
                  <div className={styles.btn}>
                    <span
                      onClick={() =>
                        router.push(
                          `/admin/section/form?slug=${slugify(item.slug)}`
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

export default Section;
