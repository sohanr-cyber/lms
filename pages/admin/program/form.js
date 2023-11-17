import React, { useEffect, useState } from "react";
import styles from "@/styles/Admin/Form.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { finishLoading, startLoading } from "@/redux/stateSlice";
import Loading from "@/components/utils/Loading";
import Upload from "@/components/utils/Upload";
import url from "@/configure";

const Form = ({ data, section }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [program, setprogram] = useState(data);
  const loading = useSelector((state) => state.state.loading);
  const userInfo = useSelector((state) => state.user.userInfo);
  const handleSubmit = async () => {
    try {
      dispatch(startLoading());
      const { data } = await axios.post(
        "/api/program",
        {
          ...program,
          division: program.division._id,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      if (data) {
        router.push("/admin/program");
      }
      dispatch(finishLoading());
    } catch (error) {
      dispatch(finishLoading());
      console.log(error);
    }
  };

  console.log(data, section);

  const handleUpdate = async (slug) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.put(
        `/api/program/${slug}`,
        {
          ...program,
          division: program.division._id,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      if (data) {
        router.push("/admin/program");
      }
      dispatch(finishLoading());
    } catch (error) {
      dispatch(finishLoading());
      console.log(error);
    }
  };

  const handleFile = (file) => {
    console.log({ file });
    setprogram({ ...program, image: file.image });
  };

  return (
    <div className={styles.wrapper}>
      {loading && <Loading />}
      <h1>{router.query.slug ? "Update" : "Create"} A Program</h1>
      <form>
        <label>Name / Title</label>
        <input
          type="text"
          onChange={(e) => setprogram({ ...program, title: e.target.value })}
          value={program.title}
        />
        <div className={styles.items}>
          {section?.map((item, index) => (
            <span
              className={styles.item}
              key={index}
              style={
                program.division._id == item._id ? { background: "grey" } : {}
              }
              onClick={(e) => setprogram({ ...program, division: item })}
            >
              {item.title}
            </span>
          ))}
        </div>
        <label>Description</label>
        <textarea
          onChange={(e) =>
            setprogram({ ...program, description: e.target.value })
          }
          value={program.description}
        />
        <Upload handle={handleFile} />
        <div className={styles.flex}>
          <div
            className={styles.btn}
            onClick={() =>
              router.query.slug
                ? handleUpdate(router.query.slug)
                : handleSubmit()
            }
          >
            Submit
          </div>
          <div
            className={styles.btn}
            onClick={() => router.push("/admin/program")}
          >
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;

export async function getServerSideProps({ query }) {
  const { slug } = query;

  const fetchData = async () => {
    const { data } = await axios.get(`${url}/api/program/${slug}`);
    return data;
  };

  const fetchSection = async () => {
    const { data } = await axios.get(`${url}/api/division`);
    return data;
  };

  const section = await fetchSection();

  if (slug) {
    const data = await fetchData();
    return {
      props: {
        data,
        section,
      },
    };
  }

  return {
    props: {
      data: {
        title: "",
        description: "",
        image: "",
        division: {},
      },
      section,
    },
  };
}
