import React from "react"
import styles from "../modules/dailyActivities.module.css"
import avatar from "../pics/dashboard/Avatar-male.png"
import imgLogo from "../pics/dashboard/Logo-black.png"
import greenCheckCircle from "../pics/dashboard/greenCheckCircle.png"
import redXCircle from "../pics/dashboard/redXCircle.png"

export default function DailyActivities() {
  return (
    <>
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
