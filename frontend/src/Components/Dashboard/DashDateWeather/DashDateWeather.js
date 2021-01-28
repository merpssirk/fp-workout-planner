import React from 'react'
import styles from './dashDateWeather.module.css';
export default function DashDateWeather(props) {
    return (
      <div className={styles.dateWeatherWrapper}>
        <div className={styles.date}>{props.currentDate}</div>
        <div className={styles.weatherTownWrapper}>
          <div className={styles.weatherIcon}>
            <img
              src={
                "http://openweathermap.org/img/wn/" + props.iconID + "@2x.png"
              }
              alt={
                "http://openweathermap.org/img/wn/" + props.iconID + "@2x.png"
              }
            />
          </div>
          <div className={styles.town}>
            {props.city}, {props.mainTemp}°
          </div>
          <div className={styles.weatherOverview}>
            <p>
              <b>Feels Like:</b> {props.feels_like}°<br />
              <b>Description:</b> {props.description}
            </p>
          </div>
        </div>
      </div>
    )
}
