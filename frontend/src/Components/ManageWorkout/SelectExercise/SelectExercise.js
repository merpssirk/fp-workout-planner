import { React } from "react";
import classNames from "classnames";
import styles from "./selectExercise.module.css";

export default function SelectExercise(props) {
  console.log(props.tempDescription);

  return (
    <div
      className={
        props.showPopup === "two"
          ? classNames(styles.selectExercisePopup, styles.active)
          : styles.selectExercisePopup
      }
    >
      <h4>Please choose one exercise from the list!</h4>
      <div className={styles.listWrapper}>
        <ul className={styles.exerciseList}>
          {props.exerciseData.map((item, index) => (
            <li
              className={styles.exerciseData}
              key={index}
              tabIndex="1"
              onClick={() => {
                props.onHandleExerciseTemp(item);
              }}
            >
              {item.name}
            </li>
          ))}
          <div className={styles.nextPreviousWrapper}>
            <span
              className={styles.previous}
              onClick={(event) => {
                props.onHandleNextExercise(event.target);
              }}
            >
              Previous
            </span>
            <span
              className={styles.next}
              onClick={(event) => {
                props.onHandleNextExercise(event.target);
              }}
            >
              Next
            </span>
          </div>
        </ul>
        {props.description[0] ? (
          <div className={styles.descriptionWrapper}>
            <h4>Description</h4>
            {props.description[1] ? (
              <img src={props.description[1]} alt="Exercise image" />
            ) : null}
            <p className={styles.description}>{props.description[0]}</p>
          </div>
        ) : null}
      </div>
      <button onClick={props.onHandleRemoveOverlay}>OK</button>
    </div>
  );
}
