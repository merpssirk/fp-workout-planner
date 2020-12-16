import React from "react";
import styles from "../modules/footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
      <div className={styles.footerContainer}>
        <div>
          <ul>
            <li>Contact</li>
            <li>Impressum</li>
            <li>Privacy</li>
            <li>Credits</li>
          </ul>
        </div>
        <div className={styles.socialMedia}>
          <p>Stay Connected Anytime, Anywhere</p>
          <a href="https://www.facebook.com/" className={styles.facebook}>
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://www.instagram.com/" className={styles.instagram}>
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://www.twitter.com/" className={styles.twitter}>
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}
