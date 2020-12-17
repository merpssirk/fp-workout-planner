
import React from 'react'
import styles from '../modules/loginRegister.module.css';
export default function Login() {
    return (
      <>
        <div className={styles.formContainer}>
          <form className={styles.loginUserName}>
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
            />
          </form>
        </div>
      </>
    );
}
