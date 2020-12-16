import React from "react";
import styles from "../modules/services.module.css";

//Import Pictures
import service1 from "../pics/services/service1.png";
import service2 from "../pics/services/service2.png";
import service3 from "../pics/services/service3.png";

export default function Services () {
  return (
    <>
      <div className={styles.servicesContainer}>
        <h1>What We Offer</h1>
        <div className={styles.offerContainer}>
          <div className={styles.offerText}>
            <h3>Create Your Own Workouts</h3>
            <img src={service1} alt="" />
          </div>
          <div className={styles.offerText}>
            <h3>Track Your Workouts</h3>
            <img src={service2} alt="" />
          </div>
          <div className={styles.offerText}>
            <h3>Be Proud of the Results</h3>
            <img src={service3} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
