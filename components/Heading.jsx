import React from "react";
import styles from "../styles/Heading.module.css";
const Heading = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <h1>{title}</h1>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed qui
      </p>
      <p>
        ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
        dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
        aspernatur aut odit aut fugit, sed qu
      </p>
    </div>
  );
};

export default Heading;
