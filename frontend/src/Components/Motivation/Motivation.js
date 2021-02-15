import React from "react";
import styles from "./motivation.module.css";
import img from "../../pics/motivation/arnie.png";

export default function Motivation() {
  return (
    <div className={styles.motivation} id="motivation">
      <div className={styles.sectionName}>
        <h2>Motivation</h2>
      </div>

      <div className={styles.motivationWrapper}>
      <div className={styles.imageWrapper}>
      <img
        src={img}
        alt="Arnold Schwarzenegger posing"
        className={styles.mainImage}
      />
      </div>
      <div className={styles.textWrapper}>
      <h1>
        THE HARDER THE WORK <br /> THE GREATER THE <br /> REWARD
      </h1>
      </div>
      </div>
    </div>
  );
}
