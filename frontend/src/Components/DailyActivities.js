import React from "react";
import {useHistory} from 'react-router-dom'
import styles from "../modules/dailyActivities.module.css";
import avatar from "../pics/dashboard/Avatar-male.png";
import imgLogo from "../pics/dashboard/Logo-black.png";
import greenCheckCircle from "../pics/dashboard/greenCheckCircle.png";
import redXCircle from "../pics/dashboard/redXCircle.png";

export default function DailyActivities() {
  //LOGOUT
  const history = useHistory()
  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn")
    history.push("/")
  }

  const calendarData = {
    year: {
      2020: {
        month: {
          0: { done: [1, 3, 5, 8], missed: [2, 4, 6] },
          1: { done: [1, 7, 5, 8], missed: [2, 4, 6] },
          2: { done: [1, 3, 5, 8], missed: [2, 4, 6] },
        },
      },
      2021: { month: { 1: {} } },
      2022: { month: { 1: {} } },
    },
  }

  const handleWorkoutData = (year, month, day, id) => {
    updateMonth(year, month, day, id)

    function updateMonth(year, monthIndex, day, id) {
      if (
        !calendarData.year[year] ||
        !calendarData.year[year].month[monthIndex] ||
        !calendarData.year[year].month[monthIndex].done ||
        !calendarData.year[year].month[monthIndex].missed
      ) {
        createMonth(year, monthIndex, day, id)
      } else {
        updateDay(year, monthIndex, day, id)
      }
    }

    function createMonth(year, monthIndex, day, id) {
      // validate year

      if (!calendarData.year[year]) {
        calendarData.year[year] = {
          month: { [monthIndex]: { done: [], missed: [] } },
        }
      }
      console.log(calendarData.year)
      // create month
      calendarData.year[year].month[monthIndex] = { done: [], missed: [] }
      if (id === 1) {
        calendarData.year[year].month[monthIndex].done.push(day)
      } else if (id === 2) {
        calendarData.year[year].month[monthIndex].missed.push(day)
      }
    }

    function updateDay(year, monthIndex, day, id) {
      if (id === 1) {
        calendarData.year[year].month[monthIndex].done.push(day)
      } else if (id === 2) {
        calendarData.year[year].month[monthIndex].missed.push(day)
      }
    }
  }

  handleWorkoutData(2019, 3, 1, 1)

  console.log(calendarData.year)
  console.log(calendarData.year[2019].month[3].done)

  return (
    <>
      <div className={styles.background}>
        <nav className={styles.navBar}>
          <ul>
            <a href="/dashboard">
              <img src={imgLogo} />
            </a>
            <li>
              <a href="/manageWorkout">Edit Workout</a>
            </li>
            <li>
              <a href="/dailyactivities">Daily Activties</a>
            </li>
            <li>
              <a href="/workoutoverview">Workout Overview</a>
            </li>
          </ul>
          <div className={styles.profileWrapper}>
            <span onClick={handleLogout}>Name</span>
            <a href="/userpage">
              <img src={avatar} />
            </a>
          </div>
        </nav>
        <h3 className={styles.date}>Monday, December 14, 2020</h3>
        <div className={styles.checkBox}>
          <div className={styles.redXCircleDiv}>
            <img src={redXCircle} />
          </div>
          <div className={styles.greenCircleDiv}>
            <img src={greenCheckCircle} />
          </div>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.exerciseContainer}>
            <div className={styles.exerciseDiv}>
              <h3>Exercise 1</h3>
              <div className={styles.exerciseImg}></div>
            </div>
            <div className={styles.exerciseDiv}>
              <h3>Exercise 2</h3>
              <div className={styles.exerciseImg}></div>
            </div>
            <div className={styles.exerciseDiv}>
              <h3>Exercise 3</h3>
              <div className={styles.exerciseImg}></div>
            </div>
            <div className={styles.exerciseDiv}>
              <h3>Exercise 4</h3>
              <div className={styles.exerciseImg}></div>
            </div>
          </div>
          <div className={styles.exerciseContainer}>
            <div className={styles.exerciseDiv}>
              <h3>Exercise 5</h3>
              <div className={styles.exerciseImg}></div>
            </div>
            <div className={styles.exerciseDiv}>
              <h3>Exercise 6</h3>
              <div className={styles.exerciseImg}></div>
            </div>
            <div className={styles.exerciseDiv}>
              <h3>Exercise 7</h3>
              <div className={styles.exerciseImg}></div>
            </div>
            <div className={styles.exerciseDiv}>
              <h3>Exercise 8</h3>
              <div className={styles.exerciseImg}></div>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.grayBtn}>Done</button>
            <button className={styles.redBtn}>Missed</button>
          </div>
        </div>
      </div>
    </>
  )
}
