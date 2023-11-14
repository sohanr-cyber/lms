"use-client";
import React, { useState } from "react";
import styles from "../styles/Auth/Login.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";
import Image from "next/image";
const Login = () => {
  const log = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const { data } = await axios.get(
          `/api/user/outh?code=${codeResponse.code}`
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => console.log(error),
    flow: "auth-code",
  });

  const [userInfo, setUserInfo] = useState({
    password: "",
    email: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const authLogin = async () => {
    if (
      !userInfo.email ||
      !userInfo.password ||
      !validateEmail(userInfo.email)
    ) {
      return;
    }

    try {
      const { data } = await axios.post("/api/user/login", {
        ...userInfo,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <form>
          <input
            type="Email"
            placeholder="Enter Your Email"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Enter Your Password"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />

          <div className={styles.btn}>Sign In</div>

          <div
            onClick={() => log()}
            className={styles.btn}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Image
              src={"https://cdn-icons-png.flaticon.com/128/300/300221.png"}
              alt="Google Login"
              width="20"
              height="20"
            />
            Sign In with Google
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
