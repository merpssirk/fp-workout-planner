import React from "react";
import styles from "./dashInfoPanel.module.css";
import dumbbell from "../../../pics/dashboard/dumbbell.png";
import weightlifter from "../../../pics/dashboard/weightlifter.png";
import flame from "../../../pics/dashboard/flame.png";
import scale from "../../../pics/dashboard/scale.png";

export default function DashInfoPanel({
  exerciseCreated,
  weightDifferenceCalc,
  printMessage,
  streak,
  workoutDays,
}) {
  return (
    <div className={styles.tilesWrapper}>
      <div className={styles.workoutsWrapper}>
        <div className={styles.tilesIcon}>
          <img src={dumbbell} alt={dumbbell} />
        </div>
        <span className={styles.tilesCounter}>
          Workouts done:
          <br />
          {workoutDays} this month
        </span>
      </div>
      <div className={styles.exercisesWrapper}>
        <div className={styles.tilesIcon}>
          <img src={weightlifter} alt={weightlifter} />
        </div>
        <span className={styles.tilesCounter}>
          Exercises created:
          <br />
          {exerciseCreated} overall
        </span>
      </div>
      <div className={styles.streakWrapper}>
        <div className={styles.tilesIcon}>
          <img src={flame} alt={flame} />
        </div>
        <span className={styles.tilesCounter}>
          Streak:
          <br />
          {streak === 1 ? streak + " day" : streak + " days"}
        </span>
      </div>
      <div className={styles.weightWrapper}>
        <div className={styles.tilesIcon}>
          <img src={scale} alt={scale} />
        </div>
        <span className={styles.tilesCounter}>
          Weight {printMessage}:
          <br />
          {weightDifferenceCalc} kg
        </span>
      </div>
    </div>
  );
}
