import React, { useEffect, useState } from "react";
import styles from "@/styles/Admin/Form.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { finishLoading, startLoading } from "@/redux/stateSlice";
import Loading from "@/components/utils/Loading";
import Upload from "@/components/utils/Upload";
import url from "@/configure";

const Form = ({ data, course }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log({ data });
  const [content, setContent] = useState(data);

  const loading = useSelector((state) => state.state.loading);
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleSubmit = async (course) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.post(
        "/api/content",
        {
          ...content,
          course,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      if (data) {
        // router.push("/admin/section");
      }
      dispatch(finishLoading());
    } catch (error) {
      dispatch(finishLoading());
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      dispatch(startLoading());
      const { data } = await axios.put(
        `/api/content/single?contentId=${router.query.content}`,
        {
          ...content,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      if (data) {
        router.push("/admin/section");
      }
      dispatch(finishLoading());
    } catch (error) {
      dispatch(finishLoading());
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      {loading && <Loading />}
      <h1>{router.query.content ? "Update" : "Create"} A Content</h1>
      <form>
        <label>Name / Title </label>
        <input
          type="text"
          onChange={(e) => setContent({ ...content, title: e.target.value })}
          value={content.title}
        />
        <label>Description</label>
        <textarea
          onChange={(e) =>
            setContent({ ...content, description: e.target.value })
          }
          value={content.description}
        />
        <div className={styles.flex}>
          <div
            className={styles.btn}
            onClick={() =>
              router.query.content ? handleUpdate() : handleSubmit(course)
            }
          >
            Submit
          </div>
          <div
            className={styles.btn}
            // onClick={() => router.push(router.previousRoute)}
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
  const { course, content } = query;
  console.log({ query });
  const fetchData = async () => {
    const { data } = await axios.get(
      `${url}/api/content/single?contentId=${content}`
    );
    return data;
  };

  if (content) {
    const data = await fetchData();
    return {
      props: {
        data,
        course,
      },
    };
  }

  return {
    props: {
      data: {
        title: "",
        description: "",
      },
      course,
    },
  };
}
