import { React, useState, useRef, useEffect } from "react"
import { useHistory } from "react-router-dom";
import classNames from "classnames"
import imgLogo from "../pics/dashboard/Logo-black.png"
import styles from "../modules/dashboard.module.css"
import avatar from "../pics/dashboard/Avatar-male.png"
//import weather from "../pics/dashboard/weather.png"
import dumbbell from "../pics/dashboard/dumbbell.png"
import weightlifter from "../pics/dashboard/weightlifter.png"
import flame from "../pics/dashboard/flame.png"
import scale from "../pics/dashboard/scale.png"
import lineTop from "../pics/dashboard/line-top.png"
import workoutDia from "../pics/dashboard/workout-diagram.png"
import weightDia from "../pics/dashboard/weight-diagram.png"
import calories from "../pics/dashboard/calories.png"
import carbs from "../pics/dashboard/carbs.png"
import protein from "../pics/dashboard/protein.png"
import fat from "../pics/dashboard/fat.png"
//import axios from "axios"

export default function Dashboard() {
  //LOGOUT
  const history = useHistory();
  const handleLogout = () => {
    window.localStorage.removeItem( "loggedIn" );
    history.push('/')
  }

  const [overlayClass, setOverlayClass] = useState("false")
  const [currentDate, setCurrentDate] = useState()
  const formCheck = localStorage.getItem("Register") || null

  useEffect(() => {
    const date = new Date()
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }

    setCurrentDate(new Intl.DateTimeFormat("en-GB", options).format(date))
  })

  useEffect(() => {
    if (formCheck === "pending") {
      setOverlayClass("true")
    } else {
      setOverlayClass("false")
    }
  }, [])

  console.log(overlayClass)

  const handleRemoveOverlay = () => {
    //event.preventDefault()
    console.log("function reached!")
    setOverlayClass(!overlayClass)
    localStorage.setItem("Register", "fulfilled")
  }
  //---WEATHER INFORMATION---
  const API_KEY = "fd8bafc7164f93efdf3c8815e92e4f18";
  const [mainTemp, setMainTemp] = useState( '' );
  const [city, setCity] = useState( 'Hamburg' );
  const [iconID, setIconID] = useState( '' );
  const [feels_like, setFeelsLike] = useState( '' );
  const [description, setDescription] = useState( '' );

  useEffect( () => {
    fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city},de&appid=${API_KEY}&units=metric` )
      .then( ( res ) => res.json() )
      .then( ( data ) => {
        console.log( data );
        setMainTemp( data.main.temp );
        setIconID( data.weather[0].icon );
        setFeelsLike(data.main.feels_like)
        setDescription(data.weather[0].description)
    })
  },[])

  //---FINISH REGISTRATION PAGE CONNECT TO BACKEND---
  const handleFinishRegistration = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const finishRegistrationField = {
      gender: formData.get("gender"),
      age: formData.get("age"),
      height: formData.get("height"),
      weight: formData.get("weight"),
      disability: formData.get("disability"),

      workoutGoals: formData.get("workoutGoals"),
      workoutDays: formData.get("workoutDays"),
      activityLevel: formData.get("activityLevel"),
    }
    try {
         const response = await fetch("/user/finishRegistration", {
           method: "POST",
           headers: {
            "Content-Type": "application/json"
           },
           credentials: "include",
           body: JSON.stringify(finishRegistrationField),
         })
      //const json = await response.json();
      console.log("function is reached")
      handleRemoveOverlay();
      
    } catch (err) {
      console.log(err)
    }
  };

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
      <div className={styles.dateWeatherWrapper}>
        <div className={styles.date}>{currentDate}</div>
        <div className={styles.weatherTownWrapper}>
          <div className={styles.weatherIcon}>
            <img
              src={"http://openweathermap.org/img/wn/" + iconID + "@2x.png"}
            />
          </div>
          <div className={styles.town}>
            {city} {mainTemp}°
          </div>
          <div className={styles.weatherOverview}>
            <p>
              <b>Feels Like:</b> {feels_like}°<br />
              <b>Description:</b> {description}
            </p>
          </div>
        </div>
      </div>
      <main className={styles.panel}>
        <div className={styles.tilesWrapper}>
          <div className={styles.workoutsWrapper}>
            <div className={styles.tilesIcon}>
              <img src={dumbbell} />
            </div>
            <span className={styles.tilesCounter}>
              Workouts done
              <br />
              10
            </span>
          </div>
          <div className={styles.exercisesWrapper}>
            <div className={styles.tilesIcon}>
              <img src={weightlifter} />
            </div>
            <span className={styles.tilesCounter}>
              Exercises created
              <br />
              12
            </span>
          </div>
          <div className={styles.streakWrapper}>
            <div className={styles.tilesIcon}>
              <img src={flame} />
            </div>
            <span className={styles.tilesCounter}>
              Streak (days)
              <br />
              10
            </span>
          </div>
          <div className={styles.weightWrapper}>
            <div className={styles.tilesIcon}>
              <img src={scale} />
            </div>
            <span className={styles.tilesCounter}>
              Weight difference
              <br />
              -2
            </span>
          </div>
        </div>
        <div className={styles.mainInfoWrapper}>
          <div className={styles.workoutOverview}>
            <h4>Workout Overview</h4>
            <img src={lineTop} />
            <div className={styles.workoutDiagram}>
              <img src={workoutDia} />
            </div>
          </div>
          <div className={styles.nutrition}>
            <h4>Nutrition</h4>
            <img src={lineTop} />
            <div className={styles.nutritionIcons}>
              <div className={styles.macrosWrapper}>
                <img src={calories} />
                <span className={styles.caloriesFigures}>3000</span>
              </div>
              <div className={styles.macrosWrapper}>
                <img src={carbs} />
                <span className={styles.carbsFigures}>350</span>
              </div>
              <div className={styles.macrosWrapper}>
                <img src={protein} />
                <span className={styles.proteinFigures}>200</span>
              </div>
              <div className={styles.macrosWrapper}>
                <img src={fat} />
                <span className={styles.fatFigures}>120</span>
              </div>
            </div>
          </div>
          <div className={styles.weightDifference}>
            <h4>Weight</h4>
            <img src={lineTop} />
            <div className={styles.weightDiagram}>
              <img src={weightDia} />
            </div>
          </div>
        </div>
      </main>
      <div
        className={
          overlayClass && formCheck === "pending"
            ? classNames(styles.formContainer, styles.active)
            : styles.formContainer
        }
      >
        <form
          onSubmit={handleFinishRegistration}
          //   onSubmit={handleSubmitLogin}
          action="/dashboard"
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
              <select name="age" id="age" required="required">
                <option value="ageDefault">Choose one</option>
                <option value="child">1-12</option>
                <option value="teen">13-17</option>
                <option value="young">18-29</option>
                <option value="middleAged">30-49</option>
                <option value="bestAger">50-69</option>
                <option value="old">70-89</option>
                <option value="eldest">90-99</option>
              </select>
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
          overlayClass && formCheck === "pending" ? styles.active : null
        }
        onClick={handleRemoveOverlay}
      ></div>
    </div>
  )
}
