import React from "react"
import styles from './dashFinishRegistration.module.css';
import classNames from "classnames";

export default function DashFinishRegistration(props) {
  return (
    <>
      <div
        className={
          props.overlayClass && props.formCheck === "pending"
            ? classNames(styles.formContainer, styles.active)
            : styles.formContainer
        }
      >
        <form
          onSubmit={props.onHandleFinishRegistration}
          //   onSubmit={handleSubmitLogin}
          action=""
          className={styles.loginUsername}
        >
          <h4>Please finish registration! </h4>
          <div className={styles.inputFields}>
            <div className={styles.fieldsLeft}>
              <label htmlFor="gender">Gender</label>
              <select name="gender" id="gender" required="required">
                <option value="genderDefault">Choose one</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                id="age"
                required="required"
                placeholder="Please enter"
              />

              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                name="height"
                placeholder="Please enter"
                required="required"
              />
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                placeholder="Please enter"
                required="required"
              />
            </div>
            <div className={styles.fieldsRight}>
              <label htmlFor="disability">Disability</label>
              <select name="disability" id="disability" required="required">
                <option value="none">None</option>
                <option value="arms">Arms</option>
                <option value="legs">Legs</option>
                <option value="back">Back</option>
              </select>
              <label htmlFor="workoutGoals">Workout Goals</label>
              <select name="workoutGoals" id="workoutGoals" required="required">
                <option value="goalsDefault">Choose one</option>
                <option value="looseWeight">Loose Weight</option>
                <option value="stayFit">Stay Fit</option>
                <option value="gainMuscles">Gain Muscles</option>
              </select>
              <label htmlFor="workoutDays">Workout Days/Week</label>
              <select name="workoutDays" id="workoutDays" required="required">
                <option value="daysDefault">Choose one</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              <label htmlFor="activity">Activity Level</label>
              <select name="activityLevel" id="activity" required="required">
                <option value="activityDefault">Choose one</option>
                <option value="sedentary">Sedentary</option>
                <option value="moderately">Moderately Active</option>
                <option value="active">Active</option>
                <option value="extraActive">Extra Ative</option>
              </select>
            </div>
          </div>
          <div className={styles.bottomSection}>
            <div>
              <label htmlFor="equipment">Equipment available</label>
              <input type="checkbox" name="equipment" />
            </div>
            <button type="submit" /* onClick={handleRemoveOverlay} */>
              OK
            </button>
          </div>
        </form>
      </div>
      <div
        id={styles.overlay}
        className={
          props.overlayClass && props.formCheck === "pending"
            ? styles.active
            : null
        }
        onClick={props.onHandleRemoveOverlay}
      ></div>
    </>
  )
}
