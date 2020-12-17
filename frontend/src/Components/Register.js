import React from 'react'
import styles from '../modules/loginRegister.module.css';

export default function Register() {
    return (
      <>
        <div className={styles.formContainer}>
          <form>
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
            />
          </form>
        </div>
      </>
    );
}
