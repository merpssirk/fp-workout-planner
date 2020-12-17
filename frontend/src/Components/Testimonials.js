import React from "react";
import tile1 from "../pics/testimonials/tile1.png";
import tile2 from "../pics/testimonials/tile2.png";
import tile3 from "../pics/testimonials/tile3.png";
import img2 from "../pics/home/Logo.png";
import styles from "../modules/testimonials.module.css";

export default function Testimonials() {
  return (
    <div className={styles.testimonials}>
      <div className={styles.sectionName}>
        <h2>Testimonials</h2>
      </div>
      <div className={styles.testimonials__main}>
        <div className={styles.tile1}>
          <img src={tile1} className={styles.picOne} />
          <img src={img2} className={styles.picTwo} />
          <p></p>
          <span></span>
        </div>
        <div className={styles.tile2}>
          <img src={tile2} className={styles.picOne} />
          <img src={img2} className={styles.picTwo} />
          <p></p>
          <span></span>
        </div>
        <div className={styles.tile3}>
          <img src={tile3} className={styles.picOne} />
          <img src={img2} className={styles.picTwo} />
          <p></p>
          <span></span>
        </div>
      </div>
    </div>
  );
}
