import React from "react"
import styles from "./dashMainPanels.module.css"
import lineTop from "../../../pics/dashboard/line-top.png"
import workoutDia from "../../../pics/dashboard/workout-diagram.png"
import weightDia from "../../../pics/dashboard/weight-diagram.png"
// import calories from "../../../pics/dashboard/calories.png"
// import carbs from "../../../pics/dashboard/carbs.png"
// import protein from "../../../pics/dashboard/protein.png"
// import fat from "../../../pics/dashboard/fat.png"
import {ReactComponent as Calories} from "../../../pics/dashboard/kcal.svg";
import {ReactComponent as Carbs} from "../../../pics/dashboard/carbs.svg";
import {ReactComponent as Protein} from "../../../pics/dashboard/protein.svg";
import {ReactComponent as Fat} from "../../../pics/dashboard/fat.svg";

export default function DashMainPanels(props) {
  
  return (
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
            <Calories className={styles.macroIcons} />
            <span className={styles.caloriesFigures}>
              {Math.round(props.caloriesValue)}
            </span>
          </div>
          <div className={styles.macrosWrapper}>
            <Carbs className={styles.macroIcons} />
            <span className={styles.carbsFigures}>{props.macros[0]}</span>
          </div>
          <div className={styles.macrosWrapper}>
            <Protein className={styles.macroIcons}/>
            <span className={styles.proteinFigures}>{Math.round(props.macros[1])}</span>
          </div>
          <div className={styles.macrosWrapper}>
            <Fat className={styles.macroIcons} />
            <span className={styles.fatFigures}>{Math.round(props.macros[2])}</span>
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
  )
}
