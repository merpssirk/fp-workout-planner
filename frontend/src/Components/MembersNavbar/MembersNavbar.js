import React from "react";
import { NavLink } from "react-router-dom";
import imgLogo from "../../pics/dashboard/Logo-black.png";
import avatar from "../../pics/dashboard/Avatar-male.png";
import styles from "./membersNavbar.module.css";

export default function MembersNavbar(props) {
  const activeStyle = { color: "black" };

  return (
    <nav className={styles.navBar}>
      <ul>
        <li>
          <NavLink to="/dashboard" activeStyle={activeStyle}>
            <img src={imgLogo} alt={imgLogo} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/manageWorkout" activeStyle={activeStyle}>
            Edit Workout
          </NavLink>
        </li>
        <li>
          <NavLink to="/dailyactivities" activeStyle={activeStyle}>
            Daily Activties
          </NavLink>
        </li>
        <li>
          <NavLink to="/workoutoverview" activeStyle={activeStyle}>
            Workout Overview
          </NavLink>
        </li>
      </ul>
      <div className={styles.profileWrapper}>
        <span onClick={props.onHandleLogout}>Logout</span>
        <NavLink to="/userpage" activeStyle={activeStyle}>
          <img src={avatar} alt={avatar} />
        </NavLink>
      </div>
    </nav>
  );
}
