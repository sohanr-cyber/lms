import React, { useEffect, useState } from "react";
import styles from "@/styles/Admin/Form.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { finishLoading, startLoading } from "@/redux/stateSlice";
import Loading from "@/components/utils/Loading";
import Upload from "@/components/utils/Upload";
import url from "@/configure";

const Form = ({ data, content }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log({ data });
  const [subContent, setSubContent] = useState(data);

  const loading = useSelector((state) => state.state.loading);
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleSubmit = async (content) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.post(
        `/api/subContent/${content}`,
        {
          ...subContent,
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
      dispatch(finishLoading());
    } catch (error) {
      dispatch(finishLoading());
      console.log(error);
    }
  };
  const handleFile = (file) => {
    console.log({ file });
    // here image represent link of the file
    setSubContent({ ...subContent, pdf: file.image });
  };
  const handleUpdate = async () => {
    try {
      dispatch(startLoading());
      const { data } = await axios.put(
        `/api/subContent/single?subContentId=${router.query.subContentId}`,
        {
          ...subContent,
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
      dispatch(finishLoading());
    } catch (error) {
      dispatch(finishLoading());
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      {loading && <Loading />}
      <h1>{router.query.subContent ? "Update" : "Create"} A subContent</h1>
      <form>
        <label>Name / Title </label>
        <input
          type="text"
          onChange={(e) =>
            setSubContent({ ...subContent, title: e.target.value })
          }
          value={subContent.title}
        />
        <label>Link</label>
        <input
          type="text"
          onChange={(e) =>
            setSubContent({ ...subContent, link: e.target.value })
          }
          value={subContent.link}
        />
        <label>Description</label>
        <textarea
          onChange={(e) =>
            setSubContent({ ...subContent, description: e.target.value })
          }
          value={subContent.description}
        />
        <Upload handle={handleFile} />

        <div className={styles.flex}>
          <div
            className={styles.btn}
            onClick={() =>
              router.query.subContentId ? handleUpdate() : handleSubmit(content)
            }
          >
            Submit
          </div>
          <div className={styles.btn} onClick={() => router.back()}>
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;

export async function getServerSideProps({ query }) {
  const { content, subContentId } = query;
  console.log({ query });
  const fetchData = async () => {
    const { data } = await axios.get(
      `${url}/api/subContent/single?subContentId=${subContentId}`
    );
    return data;
  };

  if (subContentId) {
    const data = await fetchData();
    return {
      props: {
        data,
        content,
      },
    };
  }

  return {
    props: {
      data: {
        title: "",
        description: "",
        link: "",
        pdf: "",
      },
      content,
    },
  };
}
