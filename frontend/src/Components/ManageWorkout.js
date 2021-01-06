import React from "react";
import styles from "../modules/manageWorkout.module.css";
import imgLogo from "../pics/dashboard/Logo-black.png";
import avatar from "../pics/dashboard/Avatar-male.png";

export default function ManageWorkout() {
  return (
    <div className={styles.background}>
      <nav className={styles.navBar}>
        <ul>
          <a href="home">
            <img src={imgLogo} />
          </a>
          <li>
            <a href="motivation">Edit Workout</a>
          </li>
          <li>
            <a href="services">Daily Activties</a>
          </li>
          <li>
            <a href="testimonials">Workout Overview</a>
          </li>
        </ul>
        <div className={styles.profileWrapper}>
          <span>Name</span>
          <a href="#">
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
      <div className={styles.exercisePanels}>
        <div className={styles.panelsTop}>
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
        </div>
        <div className={styles.panelsBottom}>
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
  );
}
