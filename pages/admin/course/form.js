import React, { useEffect, useState } from "react";
import styles from "@/styles/Admin/Form.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { finishLoading, startLoading } from "@/redux/stateSlice";
import Loading from "@/components/utils/Loading";
import Upload from "@/components/utils/Upload";
import url from "@/configure";

const Form = ({ data, programs }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log({ data });
  const [course, setCourse] = useState(data);
  const [list, setList] = useState(programs);
  const loading = useSelector((state) => state.state.loading);
  const userInfo = useSelector((state) => state.user.userInfo);
  const handleSubmit = async () => {
    try {
      dispatch(startLoading());
      const { data } = await axios.post(
        "/api/course",
        {
          ...course,
          program: course.program._id,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      if (data) {
        router.push("/admin/course");
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
        `/api/course/${slug}`,
        {
          ...course,
          program: course.program._id,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      if (data) {
        router.push("/admin/course");
      }
      dispatch(finishLoading());
    } catch (error) {
      dispatch(finishLoading());
      console.log(error);
    }
  };

  const handleFile = (file) => {
    console.log({ file });
    setCourse({ ...course, image: file.image });
  };

  return (
    <div className={styles.wrapper}>
      {loading && <Loading />}
      <h1>{router.query.slug ? "Update" : "Create"} A course</h1>
      <form>
        <label>Name / Title</label>
        <input
          type="text"
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
          value={course.title}
        />
        <div className={styles.items}>
          {list?.map((item, index) => (
            <span
              className={styles.item}
              key={index}
              style={
                course.program?._id == item._id ? { background: "grey" } : {}
              }
              onClick={(e) => setCourse({ ...course, program: item })}
            >
              {item.title}
            </span>
          ))}
        </div>
        <label>Description</label>
        <textarea
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
          value={course.description}
        />
        <div className={styles.items}>
          <span
            className={styles.item}
            onClick={() =>
              setCourse({ ...course, isRecommended: !course.isRecommended })
            }
            style={
              course.isRecommended
                ? {
                    background: "grey",
                  }
                : {}
            }
          >
            Recommended
          </span>
          <span
            className={styles.item}
            onClick={() =>
              setCourse({ ...course, isPopular: !course.isPopular })
            }
            style={
              course.isPopular
                ? {
                    background: "grey",
                  }
                : {}
            }
          >
            Popular
          </span>
        </div>
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
            onClick={() => router.push("/admin/course")}
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
    const { data } = await axios.get(`${url}/api/course/${slug}`);
    return data;
  };

  const fetchProgram = async () => {
    const { data } = await axios.get(`${url}/api/program`);
    return data;
  };

  const programs = await fetchProgram();

  if (slug) {
    const data = await fetchData();

    return {
      props: {
        data,
        programs,
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
        isPopular: false,
        isRecommended: false,
      },
      programs,
    },
  };
}
