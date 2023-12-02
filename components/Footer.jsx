import React from "react";
import styles from "../styles/Footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import slugify from "slugify";
import { useRouter } from "next/router";
import Link from "next/link";

const Footer = ({ section }) => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h3 className={styles.logo}>SchoolPress</h3>
        <p>
          SchoolPress is a forward-thinking Learning Management System
          revolutionizing education. Our intuitive platform empowers educators,
          engages students, and streamlines learning with customizable paths,
          robust analytics, and seamless communication. Join us in shaping the
          future of education with SchoolPress
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
