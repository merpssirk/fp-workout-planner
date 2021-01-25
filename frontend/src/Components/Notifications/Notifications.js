import React, { createContext, useState, useEffect } from "react"
import styles from "./Notifications.module.css"
export const NotificationContext = createContext()

export default function Notifications({ children }) {
  const [message, setMessage] = useState([])

  const handleNotifications = (msg) => {
    // console.log(msg)
    setMessage([...message, msg])

    setTimeout(() => {
      // console.log(12345)
      setMessage([...message.slice(1)])
    }, 9000)
  }

  /* useEffect( () => {
        console.log(message);
    },[message])
 */
  return (
    <NotificationContext.Provider value={handleNotifications}>
      {message.map((notification, id) => (
        <p key={id} className={styles.messageContainer}>
          {notification}
        </p>
      ))}
      {children}
    </NotificationContext.Provider>
  )
}
