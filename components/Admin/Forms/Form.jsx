import React, { useState } from "react";
import styles from "@/styles/Form.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";

const Form = ({ openForm, setOpenForm }) => {
  const router = useRouter();
  const [division, setDivision] = useState({
    title: "",
    description: "",
  });
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "/api/division",
        {
          ...division,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className={styles.wrapper}>
      <h1>Create A Divsion</h1>
      <form>
        <label>Name / Title</label>
        <input
          type="text"
          onChange={(e) => setDivision({ ...division, title: e.target.value })}
          value={division.title}
        />
        <label>Description</label>
        <textarea
          onChange={(e) =>
            setDivision({ ...division, description: e.target.value })
          }
          value={division.description}
        />
        <label>Upload Logo</label>
        <input type="file" />
        <div className={styles.flex}>
          <div className={styles.btn} onClick={() => handleSubmit()}>
            Submit
          </div>
          <div className={styles.btn} onClick={() => setOpenForm(false)}>
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
