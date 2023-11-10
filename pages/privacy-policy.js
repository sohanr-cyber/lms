import React from "react";
import styles from "../styles/Terms.module.css";
const privacyPolicy = [
  {
    section: "What information do we collect?",
    content:
      "We collect personal information from you when you create an account on our LMS, enroll in a course, or contact us for support. The types of personal information we collect may include your name, email address, mailing address, phone number, and payment information. We may also collect information about your use of our LMS, such as the courses you enroll in, the content you access, and the activities you complete.",
  },
  {
    section: "How do we use your information?",
    content:
      "We use your personal information to provide you with access to our LMS and courses, to communicate with you about your account and enrollment, and to provide you with customer support. We may also use your information to improve our LMS and courses, to develop new products and services, and to conduct marketing and research activities.",
  },
  {
    section: "How do we share your information?",
    content:
      "We do not sell or rent your personal information to third parties. We may share your personal information with trusted third-party service providers who help us operate and improve our LMS and courses. These service providers are only allowed to use your personal information for the limited purpose of providing services to us. We may also share your personal information with third parties if required by law or to protect the rights, property, or safety of SchoolPress, our users, or others.",
  },
  {
    section: "How do we protect your information?",
    content:
      "We implement a variety of security measures to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. These measures include physical security measures, such as restricted access to our data centers, and technological security measures, such as firewalls and encryption.",
  },
  {
    section: "Your choices",
    content:
      "You have the right to access, correct, or delete your personal information. You may also opt out of receiving marketing communications from us. To exercise these rights, please contact us at [email protected]",
  },
  {
    section: "Changes to this Privacy Policy",
    content:
      'We may update this Privacy Policy from time to time. If we make any changes, we will post the revised Privacy Policy on our website and update the "Effective Date" at the top of this page.',
  },
  {
    section: "Contact us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at [email protected]",
  },
];

const Terms = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Privacy Policy</h1>
      <div className={styles.flex}>
        {privacyPolicy.map((item, index) => (
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
