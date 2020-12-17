import React from "react";
import styles from "../modules/home.module.css";
import imgLogo from "../pics/home/Logo.png";

export default function Home() {
  return (
    <>
      <div className={styles.background}>
        <nav className={styles.navBar}>
          <ul>
            <img src={imgLogo} />
            <li>Motivation</li>
            <li>Services</li>
            <li>Testimonials</li>
          </ul>
        </nav>
        <h1>My Fitness Mate</h1>
        <h3>At Your Service!</h3>
        <div className={styles.registerTile}>
          <p className={styles.registerText}>
            Want a change? Wheather it is training at home or in a studio, we
            are here to help you reach your goals. <br />
            <br /> Stop procrastinating, start now!
          </p>
          <button>Register</button>
        </div>
        <div className={styles.loginContainer}>
          <button className={styles.loginButton}>Login</button>
        </div>
      </div>
    </>
  );
}
