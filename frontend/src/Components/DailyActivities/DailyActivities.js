import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "./dailyActivities.module.css";
import avatar from "../../pics/dashboard/Avatar-male.png";
//import avatar from "../pics/dashboard/Avatar-male.png";
import imgLogo from "../../pics/dashboard/Logo-black.png";
import greenCheckCircle from "../../pics/dashboard/greenCheckCircle.png";
import redXCircle from "../../pics/dashboard/redXCircle.png";
import DayJs from "react-dayjs";
import dayjs from "dayjs";

export default function DailyActivities() {
  const [workoutData, setWorkoutData] = useState(
    JSON.parse(localStorage.getItem("workoutData")).workout
  );
  console.log(workoutData);

  const [currentWorkout, setCurrentWorkout] = useState();

  useEffect(() => {
    fetch("/dashboard/dailyActivity", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.timestamps.startWorkoutAt);

        const startDay = dayjs().format("dddd");

        const currentDay = dayjs().format("dddd");

        const daysArray = [
          startDay,
          dayjs().add(1, "day").format("dddd"),
          dayjs().add(2, "day").format("dddd"),
          dayjs().add(3, "day").format("dddd"),
          dayjs().add(4, "day").format("dddd"),
          dayjs().add(5, "day").format("dddd"),
          dayjs().add(6, "day").format("dddd"),
        ];

        const dayIndex = daysArray.indexOf(currentDay);

        // const currentWorkout =
        setCurrentWorkout(workoutData["day" + (dayIndex + 1)].exercises);
        // const currentWorkout = workoutData["day" + (dayIndex + 1)].exercises;
        console.log(currentWorkout);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  /* 
  useEffect(() => {
    console.log(currentWorkout)
  }, [currentWorkout])
 */
  //LOGOUT
  const history = useHistory();
  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn");
    history.push("/");
  };
  // DATE:
  const [currentDate, setCurrentDate] = useState();

  const getCurrentDate = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(new Intl.DateTimeFormat("en-GB", options).format(date));
  };
  useEffect(() => {
    getCurrentDate();
  });
  // Calendar Data

  const calendarData = {
    year: {
      2020: {
        month: {
          0: { done: [1, 3, 5, 8], missed: [2, 4, 6] },
          1: { done: [1, 7, 5, 8], missed: [2, 4, 6] },
          2: { done: [1, 3, 5, 8], missed: [2, 4, 6] },
        },
      },
      2021: { month: { 1: {} } },
      2022: { month: { 1: {} } },
    },
  };

  const handleWorkoutData = (year, month, day, id) => {
    updateMonth(year, month, day, id);

    function updateMonth(year, monthIndex, day, id) {
      if (
        !calendarData.year[year] ||
        !calendarData.year[year].month[monthIndex] ||
        !calendarData.year[year].month[monthIndex].done ||
        !calendarData.year[year].month[monthIndex].missed
      ) {
        createMonth(year, monthIndex, day, id);
      } else {
        updateDay(year, monthIndex, day, id);
      }
    }

    function createMonth(year, monthIndex, day, id) {
      // validate year

      if (!calendarData.year[year]) {
        calendarData.year[year] = {
          month: { [monthIndex]: { done: [], missed: [] } },
        };
      }
      //console.log(calendarData.year)
      // create month
      calendarData.year[year].month[monthIndex] = { done: [], missed: [] };
      if (id === 1) {
        calendarData.year[year].month[monthIndex].done.push(day);
      } else if (id === 2) {
        calendarData.year[year].month[monthIndex].missed.push(day);
      }
    }

    function updateDay(year, monthIndex, day, id) {
      if (id === 1) {
        calendarData.year[year].month[monthIndex].done.push(day);
      } else if (id === 2) {
        calendarData.year[year].month[monthIndex].missed.push(day);
      }
    }
  };

  handleWorkoutData(2019, 3, 1, 1);

  //console.log(calendarData.year)
  // console.log(calendarData.year[2019].month[3].done)

  //console.log("data check", currentWorkout)

  return (
    <>
      <div className={styles.background}>
        <nav className={styles.navBar}>
          <ul>
            <a href="/dashboard">
              <img src={imgLogo} alt={imgLogo} />
            </a>
            <li>
              <a href="/manageWorkout">Edit Workout</a>
            </li>
            <li>
              <a href="/dailyactivities" className={styles.current}>
                Daily Activties
              </a>
            </li>
            <li>
              <a href="/workoutoverview">Workout Overview</a>
            </li>
          </ul>
          <div className={styles.profileWrapper}>
            <span onClick={handleLogout}>Logout</span>
            <a href="/userpage">
              <img src={avatar} alt={avatar} />
            </a>
          </div>
        </nav>
        <h3 className={styles.date}>{currentDate}</h3>
        <div className={styles.checkBox}>
          <div className={styles.redXCircleDiv}>
            <img src={redXCircle} alt={redXCircle} />
          </div>
          <div className={styles.greenCircleDiv}>
            <img src={greenCheckCircle} alt={greenCheckCircle} />
          </div>
        </div>
        {currentWorkout ? (
          <div className={styles.mainContainer}>
            <div className={styles.exerciseContainer}>
              <div className={styles.exerciseDiv}>
                <div className={styles.exerciseImg}>
                  <h4>{currentWorkout[0][0]}</h4>
                  <ul>
                    <li>
                      Body Part-: <b>{currentWorkout[0][1]}</b>
                    </li>
                    <li>
                      Sets-: <b>{currentWorkout[0][2]}</b>
                    </li>
                    <li>
                      Repetitions: <b>{currentWorkout[0][3]}</b>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.exerciseDiv}>
                <div className={styles.exerciseImg}>
                  <h4>{currentWorkout[1][0]}</h4>
                  <ul>
                    <li>
                      Body Part-: <b>{currentWorkout[1][1]}</b>
                    </li>
                    <li>
                      Sets-: <b>{currentWorkout[1][2]}</b>
                    </li>
                    <li>
                      Repetitions: <b>{currentWorkout[1][3]}</b>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.exerciseDiv}>
                <div className={styles.exerciseImg}>
                  <h4>{currentWorkout[2][0]}</h4>
                  <ul>
                    <li>
                      Body Part-: <b>{currentWorkout[2][1]}</b>
                    </li>
                    <li>
                      Sets-: <b>{currentWorkout[2][2]}</b>
                    </li>
                    <li>
                      Repetitions: <b>{currentWorkout[2][3]}</b>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.exerciseDiv}>
                <div className={styles.exerciseImg}>
                  <h4>{currentWorkout[3][0]}</h4>
                  <ul>
                    <li>
                      Body Part-: <b>{currentWorkout[3][1]}</b>
                    </li>
                    <li>
                      Sets-: <b>{currentWorkout[3][2]}</b>
                    </li>
                    <li>
                      Repetitions: <b>{currentWorkout[3][3]}</b>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.exerciseContainer}>
              <div className={styles.exerciseDiv}>
                <div className={styles.exerciseImg}>
                  <h4>{currentWorkout[4][0]}</h4>
                  <ul>
                    <li>
                      Body Part-: <b>{currentWorkout[4][1]}</b>
                    </li>
                    <li>
                      Sets-: <b>{currentWorkout[4][2]}</b>
                    </li>
                    <li>
                      Repetitions: <b>{currentWorkout[4][3]}</b>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.exerciseDiv}>
                <div className={styles.exerciseImg}>
                  <h4>{currentWorkout[5][0]}</h4>
                  <ul>
                    <li>
                      Body Part-: <b>{currentWorkout[5][1]}</b>
                    </li>
                    <li>
                      Sets-: <b>{currentWorkout[5][2]}</b>
                    </li>
                    <li>
                      Repetitions: <b>{currentWorkout[5][3]}</b>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.exerciseDiv}>
                <div className={styles.exerciseImg}>
                  <h4></h4>
                  <ul>
                    <li>
                      Body Part-: <b></b>
                    </li>
                    <li>
                      Sets-: <b></b>
                    </li>
                    <li>
                      Repetitions: <b></b>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.exerciseDiv}>
                <div className={styles.exerciseImg}>
                  <h4></h4>
                  <ul>
                    <li>
                      Body Part-: <b></b>
                    </li>
                    <li>
                      Sets-: <b></b>
                    </li>
                    <li>
                      Repetitions: <b></b>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.buttons}>
              <button className={styles.grayBtn}>Done</button>
              <button className={styles.redBtn}>Missed</button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
