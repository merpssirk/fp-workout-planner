import React from 'react';
import classNames from "classnames";
import styles from './selectBodyPart.module.css';

export default function SelectBodyPart(props) {
    return (
        <div
        className={
          !props.overlayClass
            ? classNames(styles.formContainer, styles.active)
            : styles.formContainer
        }
      >
        <h4>
          Select the body part to search <br />
          an exercise for!
        </h4>
        <form onSubmit={props.onHandleWorkoutApi} className={styles.muscles}>
          <div className={styles.muscleOptions}>
            <input
              type="radio"
              id="abs"
              name="muscles"
              value="abs"
              checked={props.radioButton === "abs"}
              onChange={(e) => {
                props.onHandleRadioButton(e.target.value)
              }}
            />
            <label for="abs">Abs</label>
          </div>
          <div className={styles.muscleOptions}>
            <input
              type="radio"
              id="arms"
              name="muscles"
              value="arms"
              checked={props.radioButton === "arms"}
              onChange={(e) => {
                props.onHandleRadioButton(e.target.value)
              }}
            />
            <label for="arms">Arms</label>
          </div>
          <div className={styles.muscleOptions}>
            <input
              type="radio"
              id="back"
              name="muscles"
              value="back"
              checked={props.radioButton === "back"}
              onChange={(e) => {
                props.onHandleRadioButton(e.target.value)
              }}
            />
            <label for="back">Back</label>
          </div>
          <div className={styles.muscleOptions}>
            <input
              type="radio"
              id="biceps"
              name="muscles"
              value="biceps"
              checked={props.radioButton === "biceps"}
              onChange={(e) => {
                props.onHandleRadioButton(e.target.value)
              }}
            />
            <label for="biceps">Biceps</label>
          </div>
          <div className={styles.muscleOptions}>
            <input
              type="radio"
              id="chest"
              name="muscles"
              value="chest"
              checked={props.radioButton === "chest"}
              onChange={(e) => {
                props.onHandleRadioButton(e.target.value)
              }}
            />
            <label for="chest">Chest</label>
          </div>
          <div className={styles.muscleOptions}>
            <input
              type="radio"
              id="Legs"
              name="muscles"
              value="legs"
              checked={props.radioButton === "legs"}
              onChange={(e) => {
                props.onHandleRadioButton(e.target.value)
              }}
            />
            <label for="Legs">Legs</label>
          </div>
          <div className={styles.muscleOptions}>
            <input
              type="radio"
              id="Shoulders"
              name="muscles"
              value="shoulders"
              checked={props.radioButton === "shoulders"}
              onChange={(e) => {
                props.onHandleRadioButton(e.target.value)
              }}
            />
            <label for="shoulders">Shoulders</label>
          </div>
          <input type="submit" value="OK" />
        </form>
      </div>
    )
}
