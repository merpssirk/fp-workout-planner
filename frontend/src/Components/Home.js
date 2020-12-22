import {React, useRef, useState} from "react";
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";
import styles from "../modules/home.module.css";
import imgLogo from "../pics/home/Logo.png";
import classNames from "classnames";
import Dashboard from "./Dashboard";

export default function Home() {
  const formCheck = useRef('');
  const [overlayClass, setOverlayClass] = useState('false');

  const handleOverlay = (event)=>{
    setOverlayClass(!overlayClass);
    formCheck.current = event.target.textContent;
  }

  const handleRemoveOverlay = (event)=>{
    event.preventDefault();
    setOverlayClass(!overlayClass);
  }

  const handleScroll = (event)=>{
    const section = event.target.textContent.toLowerCase();
    document.getElementById(section).scrollIntoView({behavior: "smooth"});
  }

  console.log(overlayClass);

  return (
      <div className={styles.background}>
        <nav className={styles.navBar}>
          <ul>
            <a href="home"><img src={imgLogo} /></a>
            <li onClick={(e)=>{handleScroll(e)}}>Motivation</li>
            <li onClick={(e)=>{handleScroll(e)}}>Services</li>
            <li onClick={(e)=>{handleScroll(e)}}>Testimonials</li>
            <li onClick={(e)=>{handleScroll(e)}}>Contact</li>
          </ul>
        </nav>
        <h1>My Fitness Mate</h1>
        <h3>At Your Service!</h3>
        <div className={styles.registerTile}>
          <p className={styles.registerText}>
            Want a change? Wheather it is training at home or in a studio, we
            are here to help you reach your goals.<br />
            <br />Stop procrastinating, start now!
          </p>
          <button onClick={(e)=>{handleOverlay(e)}}>Register</button>
        </div>
        <div className={styles.loginContainer}>
          <button className={styles.loginButton} onClick={(e)=>{handleOverlay(e)}}>Login</button>
        </div>
        <div className={(!overlayClass && formCheck.current === 'Register') ? classNames(styles.formContainer, styles.active) : styles.formContainer}>
          <form action="/dashboard">
            <div className={styles.formGroup}>
              <label htmlFor="name">Username</label>
              <input type="text" name="username" />
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
                  // onClick={(e)=>{handleRemoveOverlay(e)}}
                />
          </form>
        </div>
        <div className={(!overlayClass && formCheck.current === 'Login') ? classNames(styles.formContainer2, styles.active) : styles.formContainer2}>
          <form action="/dashboard" className={styles.loginUserName}>
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
              // onClick={(e)=>{handleRemoveOverlay(e)}}
            />
          </form>
        </div>
        <div id={styles.overlay} className={overlayClass ? null : styles.active} onClick={handleRemoveOverlay}></div>
      </div>
  );
}
