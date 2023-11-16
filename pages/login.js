"use-client";
import React, { useState } from "react";
import styles from "../styles/Auth/Login.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";
import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "@/redux/userSlice";
import Link from "next/link";
import Logo from "@/components/utils/Logo";
import { useRouter } from "next/router";
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
  const dispatch = useDispatch();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    password: "",
    email: "",
  });
  console.log(router.pathname);
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

      dispatch(login(data));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.form}>
        <div className={styles.flex}>
          <div
            className={styles.route}
            onClick={() => router.push("/login")}
            style={
              router.pathname == "/login"
                ? {
                    borderBottom: "2px solid black",
                  }
                : {}
            }
          >
            Log In
          </div>
          <div
            className={styles.route}
            onClick={() => router.push("/register")}
            style={
              router.pathname == "/register"
                ? {
                    borderBottom: "2px solid black",
                  }
                : {}
            }
          >
            Sign Up
          </div>
        </div>
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
        </form>

        <div className={styles.btn} onClick={() => authLogin()}>
          Sign In
        </div>

        {/* <div
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
        </div> */}
      </div>

      <p>
        By Clicking Log In , you agree to our{" "}
        <Link href="/terms-and-condition">Terms and Conditions </Link>
        and <Link href="/privacy-policy">Privacy Policy</Link>
      </p>
      <p className={styles.box}>
        We have recently made updates to our Terms of Conditions. Please take a
        moment to review the changes that have been implemented.
      </p>
    </div>
  );
};

export default Login;
