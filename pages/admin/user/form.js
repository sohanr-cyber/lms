import React, { useEffect, useState } from "react";
import styles from "@/styles/Admin/Form.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { finishLoading, startLoading } from "@/redux/stateSlice";
import Loading from "@/components/utils/Loading";
import Upload from "@/components/utils/Upload";
import url from "@/configure";

const Form = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log({ data });
  const [user, setuser] = useState(data);

  const loading = useSelector((state) => state.state.loading);
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleSubmit = async () => {
    try {
      dispatch(startLoading());
      const { data } = await axios.post(
        "/api/user",
        {
          ...user,
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
        `/api/user/${slug}`,
        {
          ...user,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      if (data) {
        router.push("/admin/user");
      }
      dispatch(finishLoading());
    } catch (error) {
      dispatch(finishLoading());
      console.log(error);
    }
  };

  const handleFile = (file) => {
    console.log({ file });
    setuser({ ...user, image: file.image });
  };

  return (
    <div className={styles.wrapper}>
      {loading && <Loading />}
      <h1>Update User Profile</h1>
      <form>
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => setuser({ ...user, name: e.target.value })}
          value={user.name}
        />
        {/* <label>Role</label>
        <input
          type="text"
          onChange={(e) => setuser({ ...user, title: e.target.value })}
          value={user.role}
        /> */}
        <label>Rank</label>
        <input
          type="text"
          onChange={(e) => setuser({ ...user, rank: e.target.value })}
          value={user.rank}
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
    const { data } = await axios.get(`${url}/api/user/${slug}`);
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
