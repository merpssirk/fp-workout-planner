import React from "react";
import styles from "../modules/motivation.module.css";
import img from "../pics/motivation/arnie.png";

export default function Motivation() {
  return (
    <>
      <div>
        <h2>Motivation</h2>
        <img />
      </div>
      <img
        src={img}
        alt="Arnold Schwarzenegger posing"
        className={styles.mainImage}
      />
      <h1>THE HARDER THE WORK THE GREATER THE REWARD</h1>
      <span className={styles.quoteDot}></span>
    </>
  );
}
