import React from "react";
import styles from "../../styles/Admin/Table.module.css";
import slugify from "slugify";
import Image from "next/image";

const icon = "https://cdn-icons-png.flaticon.com/128/1050/1050453.png";

const Program = ({ title, data, member }) => {
  const handleAction = () => {
    return;
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <h2>{title}</h2>
        <h2 div className={styles.new}>
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
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                {member && <td>Literature</td>}
                <td>
                  {member
                    ? "perspiciatis unde"
                    : "Sed ut perspiciatis unde omnis iste ..."}
                </td>
                <td style={{ textAlign: "center" }}>
                  <Image src={icon} width="30" height="30" alt={item.title} />
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
                    <span onClick={() => handleAction(item)}>Delete</span>
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
