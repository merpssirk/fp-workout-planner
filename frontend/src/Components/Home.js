import {React, useRef, useState} from "react";
import styles from "../modules/home.module.css";
import imgLogo from "../pics/home/Logo.png";
import classNames from "classnames";

export default function Home() {

  const formCheck = useRef("");
  const [overlayClass, setOverlayClass] = useState("false");

  const handleOverlay = (event) => {
    setOverlayClass(!overlayClass);
    formCheck.current = event.target.textContent;
  };

  const handleRemoveOverlay = (event) => {
    event.preventDefault();
    setOverlayClass(!overlayClass);
  };

  console.log(overlayClass);

  // --------REGISTER PAGE CONNECTING TO THE BACKEND-----  
  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    console.log('code is working');
    const formData = new FormData(event.target);

    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(data);
    try {
      const response = await fetch("/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };
  // ---------LOGIN PAGE CONNECTING TO THE BACKEND--------
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData( event.target );
    const data = {
      email: formData.get( 'email' ),
      password: formData.get( 'password' )
    }
    
    try {
      const response = await fetch("/user/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
    }
    catch ( err ) {
      console.log(err);
    }
  }

  return (
    <div className={styles.background}>
      <nav className={styles.navBar}>
        <ul>
          <img src={imgLogo} />
          <li>Motivation</li>
          <li>Services</li>
          <li>Testimonials</li>
          <li>Contact</li>
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
            handleOverlay(e);
          }}
        >
          Register
        </button>
      </div>

      {/*-----REGISTER PAGE-----*/}

      <div className={styles.loginContainer}>
        <button
          className={styles.loginButton}
          onClick={(e) => {
            handleOverlay(e);
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
            <label htmlFor="name">Username</label>
            <input type="text" name="username"/>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Email</label>
            <input type="email" name="email" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Password</label>
            <input type="password" name="password" />
          </div>
          <input
            type="submit"
            value="Register"
            className={styles.registerBtn}
            /* onClick={(e) => {
              handleRemoveOverlay(e);
            }} */
          />
        </form>
      </div>
      {/*---LOGIN FORM----*/}
      <div
        className={
          !overlayClass && formCheck.current === "Login"
            ? classNames(styles.formContainer2, styles.active)
            : styles.formContainer2
        }
      >
        <form onSubmit={handleSubmitLogin} className={styles.loginUserName}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Username or Email</label>
            <input type="text" name="username" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Password</label>
            <input type="password" name="password" />
          </div>
          <input
            type="submit"
            value="Login"
            className={styles.loginBtn}
            onClick={(e) => {
              handleRemoveOverlay(e);
            }}
          />
        </form>
      </div>
      <div
        id={styles.overlay}
        className={overlayClass ? null : styles.active}
        onClick={handleRemoveOverlay}
      ></div>
    </div>
  );
}
