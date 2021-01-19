import React from "react";
import classNames from "classnames";
import styles from "./selectExercise.module.css";

export default function SelectExercise(props) {
  return (
    <div
      className={
        props.showPopup === "two"
          ? classNames(styles.selectExercisePopup, styles.active)
          : styles.selectExercisePopup
      }
    >
      <h4>
        Please choose one exercise <br /> from the list!
      </h4>
      <ul className={styles.exerciseList}>
        {props.exerciseData.map((item, index) => (
          <li className={styles.exerciseData} key={index}>
            {item.name}
          </li>
        ))}
      </ul>
      <button onClick={props.onHandleRemoveOverlay}>OK</button>
    </div>
  );
}
