import React from "react";
import styles from "../modules/membersNavbar.module.css";
import imgLogo from "../pics/dashboard/Logo-black.png";
import avatar from "../pics/dashboard/Avatar-male.png";

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
        <span onClick={props.onHandleLogout}>Name</span>
        <a href="/userpage">
          <img src={avatar} />
        </a>
      </div>
    </nav>
  );
}
