import React from "react";
import { useHistory } from 'react-router-dom';
import styles from "../modules/manageWorkout.module.css";
import imgLogo from "../pics/dashboard/Logo-black.png";
import avatar from "../pics/dashboard/Avatar-male.png";
import classNames from "classnames";

export default function ManageWorkout() {
  //LOGOUT
  const history = useHistory()
  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn")
    history.push("/")
  }

  return (
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
      <div className={styles.dayIndicators}>
        <div className={styles.day1}>
          <h3>DAY 1</h3>
          <button className={styles.dayButton} id="day1"></button>
        </div>
        <div className={styles.day2}>
          <h3>DAY 2</h3>
          <button className={styles.dayButton} id="day2"></button>
        </div>
        <div className={styles.day3}>
          <h3>DAY 3</h3>
          <button className={styles.dayButton} id="day3"></button>
        </div>
        <div className={styles.day4}>
          <h3>DAY 4</h3>
          <button className={styles.dayButton} id="day4"></button>
        </div>
        <div className={styles.day5}>
          <h3>DAY 5</h3>
          <button className={styles.dayButton} id="day5"></button>
        </div>
        <div className={styles.day6}>
          <h3>DAY 6</h3>
          <button className={styles.dayButton} id="day6"></button>
        </div>
        <div className={styles.day7}>
          <h3>DAY 7</h3>
          <button className={styles.dayButton} id="day7"></button>
        </div>
      </div>
      <div className={styles.exercisePanelsWrapper}>
        <div className={styles.panels}>
          <div className={styles.panel1}>
            <h3>Exercise 1</h3>
            <div className={styles.panel}></div>
          </div>
          <div className={styles.panel2}>
            <h3>Exercise 2</h3>
            <div className={styles.panel}></div>
          </div>
          <div className={styles.panel3}>
            <h3>Exercise 3</h3>
            <div className={styles.panel}></div>
          </div>
          <div className={styles.panel4}>
            <h3>Exercise 4</h3>
            <div className={styles.panel}></div>
          </div>
          <div className={styles.panel5}>
            <h3>Exercise 5</h3>
            <div className={styles.panel}></div>
          </div>
          <div className={styles.panel6}>
            <h3>Exercise 6</h3>
            <div className={styles.panel}></div>
          </div>
          <div className={styles.panel7}>
            <h3>Exercise 7</h3>
            <div className={styles.panel}></div>
          </div>
          <div className={styles.panel8}>
            <h3>Exercise 8</h3>
            <div className={styles.panel}></div>
          </div>
        </div>
        <button className={styles.saveButton}>Save</button>
      </div>
    </div>
  )
}
