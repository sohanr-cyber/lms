import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import styles from "@/styles/Chat.module.css";
import Link from "next/link";

const Chat = () => {
  return (
    <div className={styles.wrapper}>
      <Link href="https://wa.me/+8801723315558?text=hey,wanna learn about schoolpress !">
        <WhatsAppIcon style={{ fontSize: "230%" }} />
      </Link>
    </div>
  );
};

export default Chat;
