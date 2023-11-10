import React from "react";
import styles from "../styles/Terms.module.css";
const termsAndConditions = [
  {
    section: "Acceptance of Terms",
    content:
      'By accessing or using the SchoolPress Learning Management Site ("Site"), you agree to be bound by these terms and conditions of use (the "Terms of Use"). If you do not agree to these Terms of Use, please do not access or use the Site.',
  },
  {
    section: "Eligibility",
    content:
      "To access and use the Site, you must be at least 13 years old and have the legal capacity to enter into a contract. If you are under the age of 18, you must have your parent or guardian's permission to use the Site.",
  },
  {
    section: "Use of the Site",
    content:
      "You agree to use the Site only for lawful purposes and in accordance with these Terms of Use. You agree not to use the Site to:",
  },
  {
    section: "Intellectual Property",
    content:
      "All content on the Site, including but not limited to text, images, videos, and software, is protected by copyright and other intellectual property laws. You agree not to copy, reproduce, distribute, modify, or publicly display any content on the Site without the express written permission of SchoolPress.",
  },
  {
    section: "User Account",
    content:
      "To access certain features of the Site, you may need to create a user account. You agree to provide accurate and complete information when creating your user account. You are responsible for maintaining the confidentiality of your user account password and for all activity that occurs under your account. You agree to immediately notify SchoolPress of any unauthorized use of your user account or any other breach of security.",
  },
  {
    section: "Privacy Policy",
    content:
      "SchoolPress respects your privacy and is committed to protecting your personal information. Please review our Privacy Policy for more information about how we collect, use, and share your personal information.",
  },
  {
    section: "Disclaimer of Warranties",
    content:
      'The Site is provided "as is" and "as available" without any express or implied warranties. SchoolPress does not warrant that the Site will be uninterrupted, secure, or error-free.',
  },
  {
    section: "Limitation of Liability",
    content:
      "To the fullest extent permitted by law, SchoolPress shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Site.",
  },
  {
    section: "Governing Law and Jurisdiction",
    content:
      "These Terms of Use shall be governed by and construed in accordance with the laws of the State of California, without regard to its principles of conflict of laws. Any dispute arising out of or in connection with these Terms of Use shall be subject to the exclusive jurisdiction of the state and federal courts located in the Northern District of California.",
  },
  {
    section: "Changes to the Terms of Use",
    content:
      "SchoolPress reserves the right to change these Terms of Use at any time. If we make any changes, we will post the revised Terms of Use on the Site. Your continued use of the Site after any changes to these Terms of Use constitutes your acceptance of the revised Terms of Use.",
  },
  {
    section: "Contact Us",
    content:
      "If you have any questions about these Terms of Use, please contact us at [email protected]",
  },
];

const Terms = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Terms and Condition</h1>
      <div className={styles.flex}>
        {termsAndConditions.map((item, index) => (
          <div className={styles.item} key={index}>
            <h3 className={styles.section}>{item.section}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Terms;
