import React from "react"
import { useHistory } from "react-router-dom"
import leftWhiteLine from "../../pics/dashboard/leftWhiteLine.png"
import rightWhiteLine from "../../pics/dashboard/rightWhiteLine.png"
import styles from "./userpage.module.css"
import avatar from "../../pics/dashboard/Avatar-male.png"
import imgLogo from "../../pics/dashboard/Logo-black.png"

export default function Userpage() {
  //LOGOUT
  const history = useHistory()
  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn")
    history.push("/")
  }
  //---USER EDIT PAGE CONNECT TO BACKEND---
  const handleUserEdit = async (event) => {
    event.preventDefault();
    const userData = new FormData( event.target );

    const userDataField = {
      username: userData.get( "username" ),
      email: userData.get( "email" ),
      gender: userData.get("gender"),
      age: userData.get("age"),
      height: userData.get("height"),
      weight: userData.get("weight"),
      disability: userData.get("disability"),
      workoutGoals: userData.get("workoutGoals"),
      workoutDays: userData.get("workoutDays"),
      activityLevel: userData.get( "activityLevel" ),
      avatar: userData.get("avatar")
    }
    try {
      //5ffef1e6a2b2c494bc2441f4
      const response = await fetch(
        "/user/profileEdit/5ffc466c0eb73edc274c20ea",
        {
          method: "PUT",
          //credentials: true,
          body: JSON.stringify(userDataField),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      const json = await response.json()
      console.log(json)
    } catch (err) {
      console.log(err)
    }
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
        {/* Column */}
        <form onSubmit={handleUserEdit}>
          <div className={styles.container}>
            {/* left Column */}
            <div className={styles.leftColumn}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Username</label>
                <input type="text" name="username" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="gender">Gender</label>
                <select name="gender">
                  <option value="genderDefault">Choose one</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="age">Age</label>
                <select name="age">
                  <option value="ageDefault">Choose one</option>
                  <option value="child">1-12</option>
                  <option value="teen">13-17</option>
                  <option value="young">18-29</option>
                  <option value="niddleAged">30-49</option>
                  <option value="bestAger">50-69</option>
                  <option value="old">70-89</option>
                  <option value="eldest">90-99</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="height">Height (cm)</label>
                <input type="number" name="height" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="weight">Weight (kg)</label>
                <input type="number" name="weight" />
              </div>

              <img src={leftWhiteLine} />
            </div>
            {/* Right Column */}
            <div className={styles.rightColumn}>
              <div className={styles.formGroup}>
                <select name="activityLevel">
                  <option value="activityDefault">Choose One</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="moderately">Moderately active</option>
                  <option value="active">Active</option>
                </select>
                <label htmlFor="activityLevel">Activity Level</label>
              </div>
              <div className={styles.formGroup}>
                <select name="disability">
                  <option value="disabilityDefault">Choose One</option>
                  <option value="arms">Arms</option>
                  <option value="legs">Legs</option>
                  <option value="back">Back</option>
                  <option value="none">None</option>
                </select>
                <label htmlFor="disability">Disability</label>
              </div>
              <div className={styles.formGroup}>
                <select name="workoutGoals">
                  <option value="workoutGoals">Workout Goals</option>
                  <option value="losoeWeight">Lose Weight</option>
                  <option value="stayFit">Stay Fit</option>
                  <option value="gainMuscles">Gain Muscles</option>
                </select>
                <label htmlFor="workoutGoals">Workout Goals</label>
              </div>
              <div className={styles.formGroup}>
                <select name="workoutDays" id="workoutDays">
                  <option value="daysDefault">Choose one</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                <label htmlFor="workoutDays">Workout Days/Week</label>
              </div>
              <div className={styles.formGroup}>
                <input className={styles.userPic} type="file" accept=".png, .jpg., .jpeg" name="avatar" />
                <label htmlFor="avatar">Change Avatar</label>
              </div>
              <div className={styles.formGroup}>
                <input type="password" name="changePassword" />
                <label htmlFor="changePassword">Change Password</label>
              </div>

              <img
                className={styles.rightColumnWhiteLine}
                src={rightWhiteLine}
              />
            </div>
          </div>
          <div className={styles.saveBtn}>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </>
  )
}
