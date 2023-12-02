import React from "react";
import styles from "@/styles/Members.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import NewMember from "./Admin/NewMember";

const Members = ({ members }) => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      {router.query.newMemberAt && <NewMember members={members} />}
      <div
        className={styles.add}
        onClick={() =>
          router.push(
            `${router.asPath}?newMemberAt=${router.query.program}`,
            undefined,
            { shallow: true }
          )
        }
      >
        Add New A Memeber
      </div>
      <h2>Faculty Members</h2>
      <div className={styles.flex}>
        {members?.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.imageContainer}>
              {" "}
              <Image
                src={item.image}
                width={100}
                height={100}
                alt={item.name}
              />
            </div>

            <div className={styles.right}>
              {" "}
              <div className={styles.name}>{item.name}</div>
              <div className={styles.rank}>Senior Lecturer & Coordinator</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
