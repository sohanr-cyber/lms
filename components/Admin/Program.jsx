import React, { useEffect, useState } from "react";
import styles from "../../styles/Admin/Table.module.css";
import slugify from "slugify";
import Image from "next/image";
import { useRouter } from "next/router";
import Form from "./Forms/Form";
import ProgramForm from "./Forms/ProgramForm";
import axios from "axios";

const icon = "https://cdn-icons-png.flaticon.com/128/1050/1050453.png";

const Program = ({ title, member }) => {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [openForm, setOpenForm] = useState(false);

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
  const fetchProgram = async () => {
    try {
      const { data } = await axios.get("/api/program");
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourse = async () => {
    try {
      const { data } = await axios.get("/api/program");
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {};

  useEffect(() => {
    router.query.current == "division"
      ? fetchSection()
      : router.query.current == "program"
      ? fetchProgram()
      : router.query.current == "course"
      ? fetchCourse()
      : fetchSection();
  }, [router.query]);

  console.log(router.query);
  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <h2>{title}</h2>
        <h2 div className={styles.new} onClick={() => setOpenForm(true)}>
          +
        </h2>
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {member && <th>Program</th>}
              <th>{member ? "Rank" : "Description"}</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                {member && <td>Literature</td>}
                <td>
                  {member
                    ? "perspiciatis unde"
                    : "Sed ut perspiciatis unde omnis iste ..."}
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
                    <span onClick={() => handleAction(item)}>Update</span>
                    <span onClick={() => deteteAction(item._id)}>Delete</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openForm && (
        <div className={styles.form}>
          {router.query.current == "division" ? (
            <Form setOpenForm={setOpenForm} />
          ) : router.query.current == "program" ? (
            <ProgramForm setOpenForm={setOpenForm} />
          ) : router.query.current == "course" ? (
            <ProgramForm setOpenForm={setOpenForm} />
          ) : (
            <Form setOpenForm={setOpenForm} />
          )}
        </div>
      )}
    </div>
  );
};

export default Program;
