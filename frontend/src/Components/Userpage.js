import React from "react"
import leftWhiteLine from "../pics/dashboard/leftWhiteLine.png";
import rightWhiteLine from "../pics/dashboard/rightWhiteLine.png";
import styles from "../modules/userpage.module.css"
import avatar from "../pics/dashboard/Avatar-male.png"
import imgLogo from "../pics/dashboard/Logo-black.png"

export default function Userpage() {
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
        {/* Column */}
        <div className={styles.container}>
          {/* left Column */}
          <div className={styles.leftColumn}>
            <form>
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
                <select>
                  <option value="gender">Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="age">Age</label>
                <select>
                  <option value="age">Age</option>
                  <option value="1-12">1-12</option>
                  <option value="13-17">13-17</option>
                  <option value="18-29">18-29</option>
                  <option value="30-49">30-49</option>
                  <option value="50-69">50-69</option>
                  <option value="70-89">70-89</option>
                  <option value="90-99">90-99</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="height">Height</label>
                <input type="text" name="height" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="weight">Weight</label>
                <input type="text" name="weight" />
              </div>
            </form>
            <img src={leftWhiteLine} />
          </div>
          {/* Right Column */}
          <div className={styles.rightColumn}>
            <form>
              <div className={styles.formGroup}>
                <select>
                  <option value="activity level">Activity Level</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="moderately active">Moderately active</option>
                  <option value="active">Active</option>
                </select>
                <label htmlFor="activityLevel">Activity Level</label>
              </div>
              <div className={styles.formGroup}>
                <select>
                  <option value="">
                    Choose One
                  </option>
                  <option value="arms">Arms</option>
                  <option value="legs">Legs</option>
                  <option value="back">Back</option>
                  <option value="shoulders">Shoulders</option>
                  <option value="none">None</option>
                </select>
                <label htmlFor="disability">Disability</label>
              </div>
              <div className={styles.formGroup}>
                <select>
                  <option value="">Workout Goals</option>
                  <option value="lose weight">Lose Weight</option>
                  <option value="stay fit">Stay Fit</option>
                  <option value="gain muscles">Gain Muscles</option>
                </select>
                <label htmlFor="workoutGoals">Workout Goals</label>
              </div>
              <div className={styles.formGroup}>
                <input type="text" name="workoutDays" />
                <label htmlFor="workoutDays">Workout Days/Week</label>
              </div>
              <div className={styles.formGroup}>
                <input type="picture" name="avatar" />
                <label htmlFor="avatar">Change Avatar</label>
              </div>
              <div className={styles.formGroup}>
                <input type="password" name="password" />
                <label htmlFor="changePassword">Change Password</label>
              </div>
            </form>
            <img className={styles.rightColumnWhiteLine} src={rightWhiteLine} />
          </div>
        </div>
        <div className={styles.saveBtn}>
          <button type="submit">Save</button>
        </div>
      </div>
    </>
  )
}
