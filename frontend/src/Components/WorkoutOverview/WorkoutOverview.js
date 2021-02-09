import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import styles from "./workoutoverview.module.css";
import avatar from "../../pics/dashboard/Avatar-male.png";
import imgLogo from "../../pics/dashboard/Logo-black.png";
import leftArrow from "../../pics/dashboard/leftArrow.png";
import rightArrow from "../../pics/dashboard/rightArrow.png";
import axios from "axios";
import dayjs from "dayjs";

export default function WorkoutOverview() {
  //LOGOUT
  const history = useHistory();
  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn");
    history.push("/");
  };

  // DATE:
  const calendarDays = Array.from(Array(7).keys());
  const calendarWeeks = Array.from(Array(5).keys());
  const [userData, setUserData] = useState({});
  const thisMonth = dayjs().get("month");
  const thisYear = dayjs().get("year");
  const [state, dispatch] = useReducer(updateDate, {
    month: thisMonth,
    year: thisYear,
  });
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function updateDate(state, action) {
    switch (action.type) {
      case "increment":
        if (state.month + 1 > 11) {
          return { month: 0, year: state.year + 1 };
        } else {
          return { month: state.month + 1, year: state.year };
        }
        break;
      case "decrement":
        if (state.month - 1 < 0) {
          return { month: 11, year: state.year - 1 };
        } else {
          return { month: state.month - 1, year: state.year };
        }
        break;
      default:
        break;
    }
  }

  // console.log("calendar", calendar);

  useEffect(() => {
    // FETCH THE USERDATA FROM THE DB
    axios
      .get("dashboard/updatedWeight", {
        Withcredentials: true,
      })
      .then((res) => {
        setUserData(res.data[0]);
      });
  }, []);

  useEffect(() => {
    // CALCULATE THE CALENDAR
    if (Object.keys(userData).length !== 0) {
      console.log("UserData", userData);
      const month = state.month;
      const year = state.year;
      const calendarData = [];
      const workouts = userData.timestamps.doneWorkout;
      const missed = userData.timestamps.missedWorkout;
      console.log("Current month", month);

      if (workouts.length > 0) {
        workouts.map((day, index) => {
          if (dayjs(day).year() === year && dayjs(day).month() === month) {
            calendarData.push([day, 1]);
          }
        });
      }
      if (missed.length > 0) {
        missed.map((day, index) => {
          if (dayjs(day).year() === year && dayjs(day).month() === month) {
            calendarData.push([day, 0]);
          }
        });
      }

      calendarData.sort((a, b) => {
        return new Date(a[0]) - new Date(b[0]);
      });
      let check = 0;
      for (let index = 0; index < 31; index++) {
        if (
          dayjs(index).get("date") === dayjs(calendarData[0][0]).get("date")
        ) {
          check++;
        }
      }
      console.log("check", check);
      console.log("calendarData", calendarData);
    }
  }, [state]);

  const increment = () => {
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    dispatch({ type: "decrement" });
  };

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
              <a href="/dailyactivities">Daily Activties</a>
            </li>
            <li>
              <a href="/workoutoverview" className={styles.current}>
                Workout Overview
              </a>
            </li>
          </ul>
          <div className={styles.profileWrapper}>
            <span onClick={handleLogout}>Logout</span>
            <a href="/userpage">
              <img src={avatar} alt={avatar} />
            </a>
          </div>
        </nav>
        <div className={styles.mainContainer}>
          <div className={styles.date}>
            <img src={leftArrow} alt={leftArrow} onClick={decrement} />
            <p>
              {monthNames[state.month]}, {state.year}
            </p>
            <img src={rightArrow} alt={rightArrow} onClick={increment} />
          </div>
          <div className={styles.calendar}>
            <div className={styles.contentWrapper}>
              <div className={styles.weekdays}>
                <div className={styles.emptyGrayBox}></div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
              </div>
              <div className={styles.days}>
                <div className={styles.weekCount}>
                  {calendarWeeks.map((item, index) => (
                    <div>{`W ${index + 1}`}</div>
                  ))}
                </div>
                <div className={styles.weekWrapper}>
                  <div className={styles.firstWeek}>
                    {calendarDays.map((item, index) => (
                      <div></div>
                    ))}
                  </div>
                  <div className={styles.secondWeek}>
                    {calendarDays.map((item, index) => (
                      <div></div>
                    ))}
                  </div>
                  <div className={styles.thirdWeek}>
                    {calendarDays.map((item, index) => (
                      <div></div>
                    ))}
                  </div>
                  <div className={styles.fourthWeek}>
                    {calendarDays.map((item, index) => (
                      <div></div>
                    ))}
                  </div>
                  <div className={styles.fifthWeek}>
                    {calendarDays.map((item, index) => (
                      <div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={styles.days}>
              <div className={styles.firstWeek}>
                <div className={styles.weekCount}>W1</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={styles.secondWeek}>
                <div className={styles.weekCount}>W2</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={styles.thirdWeek}>
                <div className={styles.weekCount}>W3</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={styles.fourthWeek}>
                <div className={styles.weekCount}>W4</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={styles.fifthWeek}>
                <div className={styles.weekCount}>W5</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
