import React from "react";
import styles from "./dashMainPanels.module.css";
import lineTop from "../../../pics/dashboard/line-top.png";
import weightDia from "../../../pics/dashboard/weight-diagram.png";
import { ReactComponent as Calories } from "../../../pics/dashboard/kcal.svg";
import { ReactComponent as Carbs } from "../../../pics/dashboard/carbs.svg";
import { ReactComponent as Protein } from "../../../pics/dashboard/protein.svg";
import { ReactComponent as Fat } from "../../../pics/dashboard/fat.svg";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

export default function DashMainPanels(props) {
  const weight = props.weightChartData;
 // console.log(weight);
  const data = {
    labels: ["Abs", "Arms", "Back", "Chest", "Legs", "Shoulders"],
    datasets: [
      {
        label: "Bodyparts",
        backgroundColor: "rgba(249, 16, 16, 0.8)",
        hoverBackgroundColor: "rgba(249, 16, 16,0.4)",
        data: [
          props.bodyPart[0],
          props.bodyPart[1],
          props.bodyPart[2],
          props.bodyPart[3],
          props.bodyPart[4],
          props.bodyPart[5],
          props.bodyPart[6],
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            stepSize: 5,
          },
        },
      ],
    },
  };

  const data2 = {
    labels: [
      weight[0][1],
      weight[1][1],
      weight[2][1],
      weight[3][1],
      weight[4][1],
      weight[5][1],
      weight[6][1],
      weight[7][1],
      weight[8][1],
      weight[9][1],
    ],
    datasets: [
      {
        backgroundColor: "rgba(249, 16, 16, 0.8)",
        hoverBackgroundColor: "rgba(249, 16, 16,0.4)",
        data: [
          weight[0][0],
          weight[1][0],
          weight[2][0],
          weight[3][0],
          weight[4][0],
          weight[5][0],
          weight[6][0],
          weight[7][0],
          weight[8][0],
          weight[9][0],
        ],
      },
    ],
  };

  const options2 = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            stepSize: 10,
          },
          position: "right",
        },
      ],
    },
    legend: {
      display: false,
    },
  };

  return (
    <div className={styles.mainInfoWrapper}>
      <div className={styles.workoutOverview}>
        <h4>Workout Overview</h4>
        <img src={lineTop} alt={lineTop} />
        <div className={styles.workoutDiagram}>
          <Bar data={data} width={100} height={50} options={options} />
        </div>
      </div>
      <div className={styles.nutrition}>
        <h4>Nutrition</h4>
        <img src={lineTop} alt={lineTop} />
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
            <Protein className={styles.macroIcons} />
            <span className={styles.proteinFigures}>
              {Math.round(props.macros[1])}
            </span>
          </div>
          <div className={styles.macrosWrapper}>
            <Fat className={styles.macroIcons} />
            <span className={styles.fatFigures}>
              {Math.round(props.macros[2])}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.weightDifference}>
        <h4>Weight</h4>
        <img src={lineTop} alt={lineTop} />
        <div className={styles.weightChartWrapper}>
          <div className={styles.weightDiagram}>
            {/* <img src={weightDia} alt={weightDia} /> */}
            <Line data={data2} width={100} height={50} options={options2} />
          </div>
        </div>
      </div>
    </div>
  );
}
