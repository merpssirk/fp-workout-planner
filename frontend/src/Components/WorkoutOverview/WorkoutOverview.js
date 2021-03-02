import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import styles from "./workoutoverview.module.css";
import avatar from "../../pics/dashboard/Avatar-male.png";
import imgLogo from "../../pics/dashboard/Logo-black.png";
import leftArrow from "../../pics/dashboard/leftArrow.png";
import rightArrow from "../../pics/dashboard/rightArrow.png";
import MembersNavbar from "../MembersNavbar/MembersNavbar";
import axios from "axios";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday);

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

  const [week1, setWeek1] = useState(Array.from(Array(7).keys()));
  const [week2, setWeek2] = useState(Array.from(Array(7).keys()));
  const [week3, setWeek3] = useState(Array.from(Array(7).keys()));
  const [week4, setWeek4] = useState(Array.from(Array(7).keys()));
  const [week5, setWeek5] = useState(Array.from(Array(7).keys()));

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
      let calendarData = new Array(35);

      const workouts = userData.timestamps.doneWorkout;
      const missed = userData.timestamps.missedWorkout;
      // Populate the array
      for (let i = 0; i < 35; i++) {
        calendarData[i] = [0, null];
      }
      // Get the first weekday of the selected month
      let delay = dayjs(year + "/" + (month + 1) + "/01").weekday();
      if (delay === 0) {
        delay = 7;
      }
      console.log("delay", delay, "year", year, "month", month);
      console.log("Current month", calendarData);
      // Done workout is in the current year and month
      if (workouts.length > 0) {
        workouts.map((day, index) => {
          if (dayjs(day).year() === year && dayjs(day).month() === month) {
            const position = dayjs(day).date() + (delay - 2);
            console.log("position", position);
            calendarData[position] = [day, "done"];
          }
        });
      }

      // Missed workout is in the current year and month
      if (missed.length > 0) {
        missed.map((day, index) => {
          if (dayjs(day).year() === year && dayjs(day).month() === month) {
            const position = dayjs(day).date() + (delay - 2);
            console.log("position", position);
            calendarData[position] = [day, "✗"];
          }
        });
      }

      setWeek1(calendarData.slice(0, 7));
      setWeek2(calendarData.slice(7, 14));
      setWeek3(calendarData.slice(14, 21));
      setWeek4(calendarData.slice(21, 28));
      setWeek5(calendarData.slice(28, 35));

      console.log(
        "Week1",
        week1,
        "Week2",
        week2,
        "Week3",
        week3,
        "Week4",
        week4,
        "Week5",
        week5
      );

      // calendarData.sort((a, b) => {
      //   return new Date(a[0]) - new Date(b[0]);
      // });
      // let check = 0;
      // for (let index = 0; index < 31; index++) {
      //   if (
      //     dayjs(index).get("date") === dayjs(calendarData[0][0]).get("date")
      //   ) {
      //     check++;
      //   }
      // }
      // console.log("check", check);
      console.log("calendarData", calendarData);
    }
  }, [[], state]);

  const increment = () => {
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    dispatch({ type: "decrement" });
  };

  return (
    <>
      <div className={styles.background}>
        <MembersNavbar onHandleLogout={handleLogout} />
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
                      <div className={styles.indicator}>
                        {week1[index] ? week1[index][1] : null}
                      </div>
                    ))}
                  </div>
                  <div className={styles.secondWeek}>
                    {calendarDays.map((item, index) => (
                      <div className={styles.indicator}>
                        {week2[index] ? week2[index][1] : null}
                      </div>
                    ))}
                  </div>
                  <div className={styles.thirdWeek}>
                    {calendarDays.map((item, index) => (
                      <div className={styles.indicator}>
                        {week3[index] ? week3[index][1] : null}
                      </div>
                    ))}
                  </div>
                  <div className={styles.fourthWeek}>
                    {calendarDays.map((item, index) => (
                      <div className={styles.indicator}>
                        {week4[index] ? week4[index][1] : null}
                      </div>
                    ))}
                  </div>
                  <div className={styles.fifthWeek}>
                    {calendarDays.map((item, index) => (
                      <div className={styles.indicator}>
                        {week5[index] ? week5[index][1] : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
