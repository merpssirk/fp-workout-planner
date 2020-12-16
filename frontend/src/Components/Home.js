import React from "react";
import styles from "../modules/home.module.css";
import imgLogo from "../pics/home/Logo.png";

export default function Home() {
  return (
    <>
      <div className={styles.mainBackground}>
        <nav className={styles.navBar}>
          <ul>
            <img src={imgLogo} />
            <li>Motivation</li>
            <li>Services</li>
            <li>Company</li>
          </ul>
        </nav>
        <h1></h1>
        <h3></h3>
        <div className={styles.registerTile}>
          <p className={styles.registerText}></p>
          <button>Register</button>
          <span>It's free!</span>
        </div>
        <button className={styles.loginButton}>Login</button>
      </div>
    </>
  );
}
