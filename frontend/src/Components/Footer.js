import React from "react";
import styles from "../modules/footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgTriangle from "../pics/footer/triangle.png";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.information}>
          <ul>
            <li>
              <a href="https://contact.com">Contact</a>
            </li>
            <li>
              <a href="https://impressum.com">Impressum</a>
            </li>
            <li>
              <a href="https://privacy.com">Privacy Policy</a>
            </li>
            <li>
              <a href="https://credits.com">Credits</a>
            </li>
          </ul>
        </div>
        <div className={styles.socialMedia}>
          <p>
            Stay
            <br />
            Connected
            <br />
            Anytime, Anywhere
          </p>
          <div className={styles.socialMediaContainer}>
            <div className={styles.socialMediaBg}>
              <a href="https://www.facebook.com/" className={styles.facebook}>
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
            </div>
            <div className={styles.socialMediaBg}>
              <a href="https://www.instagram.com/" className={styles.instagram}>
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </div>
            <div className={styles.socialMediaBg}>
              <a href="https://www.twitter.com/" className={styles.twitter}>
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </div>
          </div>
        </div>
        <img className={styles.triangle} src={imgTriangle} alt="" />
      </div>
    </>
  );
}
