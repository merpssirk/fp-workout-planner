import React from "react";
import styles from "../modules/motivation.module.css";
import img from "../pics/motivation/arnie.png";

export default function Motivation() {
  return (
    <div className={styles.motivation}>
      <div className={styles.sectionName}>
        <h2>Motivation</h2>
      </div>

      <img
        src={img}
        alt="Arnold Schwarzenegger posing"
        className={styles.mainImage}
      />
      <h1>
        THE HARDER THE WORK <br /> THE GREATER THE <br /> REWARD
      </h1>
    </div>
  );
}
