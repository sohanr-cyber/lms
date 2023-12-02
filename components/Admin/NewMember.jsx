import React, { useState, useEffect } from "react";
import styles from "@/styles/Admin/NewMember.module.css";
import axios from "axios";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const NewMember = ({ members }) => {
  const [selected, setSelected] = useState(members);
  const [allUsers, setAllUsers] = useState([]);
  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();
  console.log({ selected });
  useEffect(() => {
    fetch();
  }, []);

  const addInstructors = async () => {
    try {
      const { data } = await axios.post(
        `/api/program/${router.query.program}`,
        {
          instructors: selected.map((item) => item._id),
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      if (data) {
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetch = async () => {
    try {
      const { data } = await axios.get("/api/user");
      setAllUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Add new Member here !</h1>
      <div className={styles.flex}>
        {allUsers?.map((item, index) => (
          <div
            className={styles.item}
            style={
              selected?.find((i) => i._id == item._id)
                ? { background: "skyblue", color: "black" }
                : {}
            }
            key={index}
            onClick={() => {
              selected?.find((i) => i._id == item._id)
                ? setSelected((prev) => prev.filter((i) => i._id != item._id))
                : setSelected((prev) => [...prev, item]);
            }}
          >
            <Image src={item.image} width="75" height="75" alt="" />
            <div className={styles.name}>{item.name}</div>
          </div>
        ))}
      </div>
      <div className={styles.add} onClick={() => addInstructors()}>
        Done
      </div>
    </div>
  );
};

export default NewMember;
