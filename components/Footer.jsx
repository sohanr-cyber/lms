import React from "react";
import styles from "../styles/Footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import slugify from "slugify";
import { useRouter } from "next/router";
import Link from "next/link";

const routes = [
  {
    name: "General Science (6-12)",
    route: `/faculty/${slugify("General Science (6-12)")}`,
  },
  {
    name: "Enlgish Literature",
    route: `/faculty/${slugify("Enlgish Literature")}`,
  },
  {
    name: "Cultural Studies",
    route: `/faculty/${slugify("Cultural Studies")}`,
  },
  // {
  //   name: "Applied Langustic And ELT",
  //   route: `/faculty/${slugify("Applied Langustic And ELT")}`,
  // },
  // {
  //   name: "Bangla Literature And Grammer",
  //   route: `/faculty/${slugify("Bangla Literature And Grammer")}`,
  // },
  {
    name: "Information And Technology",
    route: `/faculty/${slugify("Information And Technology")}`,
  },
];
const Footer = () => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h3 className={styles.logo}>SchoolPress</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in.
        </p>
      </div>
      <div className={styles.mid}>
        <h3>Our Company</h3>
        <div className={styles.flex}>
          {" "}
          <div className={styles.item}>Pogram</div>
          <div className={styles.item}>Career</div>
        </div>

        <div className={styles.flex}>
          <div className={styles.item}>General Science(9-12)</div>
          <div className={styles.item}>IELTS</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.item}>Bangla Literature</div>
          <div className={styles.item}>Information & Technology</div>
        </div>
        <div className={styles.flex}>
          <div
            className={styles.item}
            onClick={() => router.push("/terms-and-conditions")}
          >
            Terms and conditions
          </div>
          <div
            className={styles.item}
            onClick={() => router.push("/privacy-policy")}
          >
            Privacy and policy
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <h3>Contact Us</h3>
        <div className={styles.call}>
          Call us: <span>+8859723593</span>
        </div>
        <div className={styles.call}>
          Mail Us :&nbsp;
          <span>
            <Link href="mailto:schoolpressedu@gmail.com">
              schoolpressedu@gmail.com
            </Link>
          </span>
        </div>
        <div className={styles.socialLinks}>
          <div className={styles.icon}>
            <Link href="https://www.facebook.com/profile.php?id=61553304039945">
              <FacebookIcon />
            </Link>
          </div>
          <div className={styles.icon}>
            <LinkedInIcon />
          </div>
          <div className={styles.icon}>
            <InstagramIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
