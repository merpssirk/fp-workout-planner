import { React, useState, useRef, useEffect } from "react"
import { useHistory } from "react-router-dom"
import styles from "./dashboard.module.css"
//import MembersNavbar from "./MembersNavbar/MembersNavbar"
import MembersNavbar from "../MembersNavbar/MembersNavbar";
import DashDateWeather from "./DashDateWeather/DashDateWeather"
import DashInfoPanel from "./DashInfoPanel/DashInfoPanel"
import DashMainPanels from "./DashMainPanels/DashMainPanels"
import DashFinishRegistration from "./DashFinishRegistration/DashFinishRegistration"

export default function Dashboard() {
  //LOGOUT
  const history = useHistory()
  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn")
    history.push("/")
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
  const API_KEY = "fd8bafc7164f93efdf3c8815e92e4f18"
  const [mainTemp, setMainTemp] = useState("")
  const [city, setCity] = useState("Hamburg")
  const [iconID, setIconID] = useState("")
  const [feels_like, setFeelsLike] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},de&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setMainTemp(Math.round(data.main.temp))
        setIconID(data.weather[0].icon)
        setFeelsLike(data.main.feels_like)
        setDescription(data.weather[0].description)
      })
  }, [])

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
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(finishRegistrationField),
      })
      //const json = await response.json();
      console.log("function is reached")
      handleRemoveOverlay()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.background}>
      <MembersNavbar onHandleLogout={handleLogout} />
      <DashDateWeather
        currentDate={currentDate}
        iconID={iconID}
        city={city}
        mainTemp={mainTemp}
        feels_like={feels_like}
        description={description}
      />
      <main className={styles.panel}>
        <DashInfoPanel />
        <DashMainPanels />
        <DashFinishRegistration
          overlayClass={overlayClass}
          formCheck={formCheck}
          onHandleFinishRegistration={handleFinishRegistration}
          onHandleRemoveOverlay={handleRemoveOverlay}
        />
      </main>
    </div>
  )
}
