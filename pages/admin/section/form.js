import React, { useEffect, useState } from "react";
import styles from "@/styles/Admin/Form.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { finishLoading, startLoading } from "@/redux/stateSlice";
import Loading from "@/components/utils/Loading";
import Upload from "@/components/utils/Upload";
import url from "@/configure";

const Form = ({ openForm, setOpenForm, data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log({ data });
  const [division, setDivision] = useState(data);

  const loading = useSelector((state) => state.state.loading);
  const userInfo = useSelector((state) => state.user.userInfo);

  const fetch = async (slug) => {
    try {
      const { data } = await axios.get(`/api/division/${slug}`);
      setDivision(data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (router.query.slug) {
  //     fetch(router.query.slug);
  //   }
  // }, [router.query.slug]);

  // useEffect(() => {
  //   if (userInfo?.user.role != "admin") {
  //     router.push("/");
  //   }
  // }, []);

  const handleSubmit = async () => {
    try {
      dispatch(startLoading());
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
      if (data) {
        router.push("/admin/section");
      }
      dispatch(finishLoading());
    } catch (error) {
      dispatch(finishLoading());
      console.log(error);
    }
  };

  const handleUpdate = async (slug) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.put(
        `/api/division/${slug}`,
        {
          ...division,
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

  const handleFile = (file) => {
    console.log({ file });
    setDivision({ ...division, image: file.image });
  };

  return (
    <div className={styles.wrapper}>
      {loading && <Loading />}
      <h1>{router.query.slug ? "Update" : "Create"} A Divsion</h1>
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
            onClick={() => router.push("/admin/section")}
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
    const { data } = await axios.get(`${url}/api/division/${slug}`);
    return data;
  };

  if (slug) {
    const data = await fetchData();
    return {
      props: {
        data,
      },
    };
  }

  return {
    props: {
      data: {
        title: "",
        description: "",
        image: "",
      },
    },
  };
}
