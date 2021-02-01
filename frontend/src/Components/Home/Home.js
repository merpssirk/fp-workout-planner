import { React, useRef, useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import styles from "./home.module.css"
import imgLogo from "../../pics/home/Logo.png"
import classNames from "classnames"
//import Dashboard from "../../Dashboard/Dashboard"
import { NotificationContext } from "../Notifications/Notifications"

export default function Home() {

  const setMessage = useContext( NotificationContext )
  
  const [error, setError] = useState("");
  
  const history = useHistory()
  const formCheck = useRef("")
  const [overlayClass, setOverlayClass] = useState("false")

  const handleOverlay = (event) => {
    setOverlayClass(!overlayClass)
    formCheck.current = event.target.textContent
  }

  const handleRemoveOverlay = (event) => {
    event.preventDefault()
    setOverlayClass(!overlayClass)
  }

  const handleScroll = (event) => {
    const section = event.target.textContent.toLowerCase()
    document.getElementById(section).scrollIntoView({ behavior: "smooth" })
  }

  console.log(overlayClass)

  // --------REGISTER PAGE CONNECTING TO THE BACKEND-----
  const handleSubmitRegister = async (event) => {
    event.preventDefault()
   
    const formData = new FormData(event.target)

    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    }
    console.log(data)
    try {
      const response = await fetch("/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(data),
      } )
     const json = await response.json()
     console.log( json );
     setError(json.msg)       
            
      if (response.status !== 200) {
        throw "error"
      }
      console.log(response)
      
      localStorage.setItem("Register", "pending")
      window.localStorage.setItem( "loggedIn", JSON.stringify( true ) )
      
      history.push("/dashboard")
    
    } catch (err) {
      console.log( err )  
    }
  }
  
  // ---------LOGIN PAGE CONNECTING TO THE BACKEND--------
  const handleSubmitLogin = async (event) => {
   // setMessage("Welcome Back on Your Dashboard Page!!")
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    }

    try {
      const response = await fetch("/user/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      } )
      const json = await response.json()
      console.log( json )
      setError(json.msg)       
      if (response.status !== 200) {
        throw "error"
        
      }
      console.log(response.status)
      //const json = await response.json()
      //console.log(json)
      window.localStorage.setItem("loggedIn", JSON.stringify(true))
      history.push("/dashboard")
    } catch (err) {
      console.log(err)
    }

    try {
      fetch("/dashboard/defaultWorkout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
        //  console.log(999, JSON.stringify(data))
          localStorage.setItem("workoutData", JSON.stringify(data))
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.background}>
      <nav className={styles.navBar}>
        <ul>
          <a href="/home">
            <img src={imgLogo} alt={imgLogo} />
          </a>
          <li
            onClick={(e) => {
              handleScroll(e)
            }}
          >
            Motivation
          </li>
          <li
            onClick={(e) => {
              handleScroll(e)
            }}
          >
            Services
          </li>
          <li
            onClick={(e) => {
              handleScroll(e)
            }}
          >
            Testimonials
          </li>
          <li
            onClick={(e) => {
              handleScroll(e)
            }}
          >
            Contact
          </li>
        </ul>
      </nav>
      <h1>My Fitness Mate</h1>
      <h3>At Your Service!</h3>
      <div className={styles.registerTile}>
        <p className={styles.registerText}>
          Want a change? Wheather it is training at home or in a studio, we are
          here to help you reach your goals.
          <br />
          <br />
          Stop procrastinating, start now!
        </p>
        <button
          onClick={(e) => {
            handleOverlay(e)
          }}
        >
          Register
        </button>
      </div>
      <div className={styles.loginContainer}>
        <button
          className={styles.loginButton}
          onClick={(e) => {
            handleOverlay(e)
          }}
        >
          Login
        </button>
      </div>
      <div
        className={
          !overlayClass && formCheck.current === "Register"
            ? classNames(styles.formContainer, styles.active)
            : styles.formContainer
        }
      >
        <form onSubmit={handleSubmitRegister}>
          <div className={styles.formGroup}>
            <span>{error}</span>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" required="required" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required="required" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required="required" />
          </div>
          <input
            type="submit"
            value="Register"
            className={styles.registerBtn}
            // onClick={(e)=>{handleRemoveOverlay(e)}}
          />
        </form>
      </div>
      <div
        className={
          !overlayClass && formCheck.current === "Login"
            ? classNames(styles.formContainer2, styles.active)
            : styles.formContainer2
        }
      >
        <form
          onSubmit={handleSubmitLogin}
          action="/dashboard"
          className={styles.loginUserName}
        >
          <div className={styles.formGroup}>
            <span>{error}</span>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required="required" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required="required" />
          </div>
          <input
            type="submit"
            value="Login"
            className={styles.loginBtn}
            // onClick={(e)=>{handleRemoveOverlay(e)}}
          />
        </form>
      </div>
      <div
        id={styles.overlay}
        className={overlayClass ? null : styles.active}
        onClick={handleRemoveOverlay}
      ></div>
    </div>
  )
}
