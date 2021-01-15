import React from 'react'
import imgLogo from "../../pics/dashboard/Logo-black.png"
import avatar from "../../pics/dashboard/Avatar-male.png"
import styles from "./membersNavbar.module.css";

export default function MembersNavbar(props) {
    return (
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
          <span onClick={props.onHandleLogout}>Logout</span>
          <a href="/userpage">
            <img src={avatar} />
          </a>
        </div>
      </nav>
    )
}
