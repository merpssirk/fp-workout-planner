import React from "react";
import { useHistory } from 'react-router-dom';
import styles from "./workoutoverview.module.css"
import avatar from "../../pics/dashboard/Avatar-male.png"
import imgLogo from "../../pics/dashboard/Logo-black.png"
import leftArrow from "../../pics/dashboard/leftArrow.png"
import rightArrow from "../../pics/dashboard/rightArrow.png"
export default function WorkoutOverview() {
  //LOGOUT
  const history = useHistory()
  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn")
    history.push("/")
  }

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
        <div className={styles.mainContainer}>
          <div className={styles.date}>
            <img src={leftArrow} />
            <p>December 2020</p>
            <img src={rightArrow} />
          </div>
          <div className={styles.calendar}>
            <div className={styles.weekdays}>
              <div className={styles.emptyGrayBox}></div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>
            <div className={styles.days}>
              <div className={styles.firstWeek}>
                <div className={styles.weekCount}>W1</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={styles.secondWeek}>
                <div className={styles.weekCount}>W2</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={styles.thirdWeek}>
                <div className={styles.weekCount}>W3</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={styles.fourthWeek}>
                <div className={styles.weekCount}>W4</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={styles.fifthWeek}>
                <div className={styles.weekCount}>W5</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
