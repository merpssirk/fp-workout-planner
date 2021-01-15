import React from 'react'
import styles from './dashInfoPanel.module.css';
import dumbbell from "../../../pics/dashboard/dumbbell.png"
import weightlifter from "../../../pics/dashboard/weightlifter.png"
import flame from "../../../pics/dashboard/flame.png"
import scale from "../../../pics/dashboard/scale.png"

export default function DashInfoPanel() {
    return (
      <div className={styles.tilesWrapper}>
        <div className={styles.workoutsWrapper}>
          <div className={styles.tilesIcon}>
            <img src={dumbbell} />
          </div>
          <span className={styles.tilesCounter}>
            Workouts done
            <br />
            10
          </span>
        </div>
        <div className={styles.exercisesWrapper}>
          <div className={styles.tilesIcon}>
            <img src={weightlifter} />
          </div>
          <span className={styles.tilesCounter}>
            Exercises created
            <br />
            12
          </span>
        </div>
        <div className={styles.streakWrapper}>
          <div className={styles.tilesIcon}>
            <img src={flame} />
          </div>
          <span className={styles.tilesCounter}>
            Streak (days)
            <br />
            10
          </span>
        </div>
        <div className={styles.weightWrapper}>
          <div className={styles.tilesIcon}>
            <img src={scale} />
          </div>
          <span className={styles.tilesCounter}>
            Weight difference
            <br />
            -2
          </span>
        </div>
      </div>
    )
}
