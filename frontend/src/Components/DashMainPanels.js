import React from "react";
import styles from "../modules/dashMainPanels.module.css";
import lineTop from "../pics/dashboard/line-top.png";
import workoutDia from "../pics/dashboard/workout-diagram.png";
import weightDia from "../pics/dashboard/weight-diagram.png";
import calories from "../pics/dashboard/calories.png";
import carbs from "../pics/dashboard/carbs.png";
import protein from "../pics/dashboard/protein.png";
import fat from "../pics/dashboard/fat.png";

export default function DashMainPanels() {
  return (
    <>
      <div className={styles.mainInfoWrapper}>
        <div className={styles.workoutOverview}>
          <h4>Workout Overview</h4>
          <img src={lineTop} />
          <div className={styles.workoutDiagram}>
            <img src={workoutDia} />
          </div>
        </div>
        <div className={styles.nutrition}>
          <h4>Nutrition</h4>
          <img src={lineTop} />
          <div className={styles.nutritionIcons}>
            <div className={styles.macrosWrapper}>
              <img src={calories} />
              <span className={styles.caloriesFigures}>3000</span>
            </div>
            <div className={styles.macrosWrapper}>
              <img src={carbs} />
              <span className={styles.carbsFigures}>350</span>
            </div>
            <div className={styles.macrosWrapper}>
              <img src={protein} />
              <span className={styles.proteinFigures}>200</span>
            </div>
            <div className={styles.macrosWrapper}>
              <img src={fat} />
              <span className={styles.fatFigures}>120</span>
            </div>
          </div>
        </div>
        <div className={styles.weightDifference}>
          <h4>Weight</h4>
          <img src={lineTop} />
          <div className={styles.weightDiagram}>
            <img src={weightDia} />
          </div>
        </div>
      </div>
    </>
  );
}
