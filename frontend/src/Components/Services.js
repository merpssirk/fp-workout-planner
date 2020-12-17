import React from "react";
import styles from "../modules/services.module.css";

//Import Pictures
import service1 from "../pics/services/service1.png";
import service2 from "../pics/services/service2.png";
import service3 from "../pics/services/service3.png";
import redlines from "../pics/services/redlines.png";

export default function Services() {
  return (
    <>
      <div className={styles.servicesContainer}>
        <div className={styles.sectionName}>
          <h2>What We Offer</h2>
        </div>
        <div className={styles.offerContainer}>
          <div className={styles.offerText}>
            <h3>
              Create Your Own
              <br />
              Workouts
            </h3>
            <img src={service1} alt="" className={styles.servicePics} />
            <img src={redlines} className={styles.redLines} alt="" />
          </div>
          <div className={styles.offerText}>
            <h3>
              Track Your
              <br />
              Workouts
            </h3>
            <img src={service2} alt="" className={styles.servicePics} />
            <img src={redlines} className={styles.redLines} alt="" />
          </div>
          <div className={styles.offerText}>
            <h3>
              Be Proud of
              <br />
              the Results
            </h3>
            <img src={service3} alt="" className={styles.servicePics} />
            <img src={redlines} className={styles.redLines} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
