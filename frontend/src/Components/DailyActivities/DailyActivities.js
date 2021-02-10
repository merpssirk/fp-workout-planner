import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import MembersNavbar from "../MembersNavbar/MembersNavbar";
import styles from "./dailyActivities.module.css";
import avatar from "../../pics/dashboard/Avatar-male.png";
//import avatar from "../pics/dashboard/Avatar-male.png";
import imgLogo from "../../pics/dashboard/Logo-black.png";
import greenCheckCircle from "../../pics/dashboard/greenCheckCircle.png";
//import redXCircle from "../../pics/dashboard/redXCircle.png"
//import DayJs from "react-dayjs"

import dayjs from "dayjs";

export default function DailyActivities() {
  const [workoutData, setWorkoutData] = useState(
    JSON.parse(localStorage.getItem("workoutData")).workout
  );

  const panels = useRef([0, 1, 2, 3, 4, 5, 6, 7]);

  const [currentWorkout, setCurrentWorkout] = useState(
    workoutData.day1.exercises[0]
  );
  const [indexOfDay, setIndexOfDay] = useState(1);

  const handleCalculateDays = (data) => {
    const startDay = dayjs(data.timestamps.startWorkoutAt).format("dddd");

    const currentDay = dayjs().format("dddd");

    const daysArray = [
      startDay,
      dayjs(data.timestamps.startWorkoutAt).add(1, "day").format("dddd"),
      dayjs(data.timestamps.startWorkoutAt).add(2, "day").format("dddd"),
      dayjs(data.timestamps.startWorkoutAt).add(3, "day").format("dddd"),
      dayjs(data.timestamps.startWorkoutAt).add(4, "day").format("dddd"),
      dayjs(data.timestamps.startWorkoutAt).add(5, "day").format("dddd"),
      dayjs(data.timestamps.startWorkoutAt).add(6, "day").format("dddd"),
    ];

    const dayIndex = daysArray.indexOf(currentDay);
    setIndexOfDay(dayIndex);

    console.log("Index of today", dayIndex);

    setCurrentWorkout(workoutData["day" + (dayIndex + 1)].exercises);
  };
  const [userData, setUserData] = useState({});
  const [dayData, setDayData] = useState("initial");
  const [lastDoneWorkoutDate, setLastDoneWorkoutDate] = useState();

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
        handleCalculateDays(data);
        setUserData(data);
        setLastDoneWorkoutDate(data.timestamps);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(currentWorkout);
  }, [currentWorkout]);

  useEffect(() => {
    console.log("Button colour", workoutData.day1);
  });

  useEffect(() => {
    setDayData(workoutData["day" + (indexOfDay + 1)].button);
  }, [indexOfDay]);

  const [workoutDone, setWorkoutDone] = useState(false);

  const handleWorkoutDone = async () => {
    const today = dayjs().format("YYYY/MM/DD");
    let workoutDoneAt;

    if (Object.keys(userData).length !== 0) {
      const lastDate = userData.timestamps.doneWorkout.length - 1;
      if (lastDate < 0) {
        workoutDoneAt = dayjs("2021/01/01").format("YYYY/MM/DD");
      } else {
        workoutDoneAt = dayjs(userData.timestamps.doneWorkout[lastDate]).format(
          "YYYY/MM/DD"
        );
      }

      console.log("Last date", lastDate);
      if (workoutDoneAt === today) {
        setWorkoutDone(true);
      } else {
        setWorkoutDone(true);
        const doneWorkout = dayjs().format("YYYY/MM/DD");
        try {
          await fetch("/dashboard/updateDate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ doneWorkout }),
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleCheckLastDate = () => {
    if (lastDoneWorkoutDate) {
      const myDate = dayjs().format("DD.MM.YYYY");
      const lastDateInArray =
        lastDoneWorkoutDate.doneWorkout[
          lastDoneWorkoutDate.doneWorkout.length - 1
        ];
      const lastDateInArrayFormat = dayjs(lastDateInArray).format("DD.MM.YYYY");
      if (lastDateInArrayFormat === myDate) {
        setWorkoutDone(true);
        if (lastDoneWorkoutDate.doneWorkout.length === 0) {
          handleWorkoutDone();
        }
      } else {
        handleWorkoutDone();
      }
    }
  };

  useEffect(() => {
    if (lastDoneWorkoutDate) {
      const myDate = dayjs().format("DD.MM.YYYY");
      const lastDateInArray =
        lastDoneWorkoutDate.doneWorkout[
          lastDoneWorkoutDate.doneWorkout.length - 1
        ];

      const lastDateInArrayFormat = dayjs(lastDateInArray).format("DD.MM.YYYY");

      if (
        lastDateInArrayFormat === myDate &&
        lastDoneWorkoutDate.doneWorkout.length > 0
      ) {
        setWorkoutDone(true);
      }
    }
  }, [lastDoneWorkoutDate, workoutDone]);

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
  // const calendarData = {
  //   year: {
  //     2020: {
  //       month: {
  //         0: { done: [1, 3, 5, 8], missed: [2, 4, 6] },
  //         1: { done: [1, 7, 5, 8], missed: [2, 4, 6] },
  //         2: { done: [1, 3, 5, 8], missed: [2, 4, 6] },
  //       },
  //     },
  //     2021: { month: { 1: {} } },
  //     2022: { month: { 1: {} } },
  //   },
  // };

  // const handleWorkoutData = (year, month, day, id) => {
  //   updateMonth(year, month, day, id);

  //   function updateMonth(year, monthIndex, day, id) {
  //     if (
  //       !calendarData.year[year] ||
  //       !calendarData.year[year].month[monthIndex] ||
  //       !calendarData.year[year].month[monthIndex].done ||
  //       !calendarData.year[year].month[monthIndex].missed
  //     ) {
  //       createMonth(year, monthIndex, day, id);
  //     } else {
  //       updateDay(year, monthIndex, day, id);
  //     }
  //   }

  //   function createMonth(year, monthIndex, day, id) {
  //     // validate year
  //     if (!calendarData.year[year]) {
  //       calendarData.year[year] = {
  //         month: { [monthIndex]: { done: [], missed: [] } },
  //       };
  //     }
  //     // create month
  //     calendarData.year[year].month[monthIndex] = { done: [], missed: [] };
  //     if (id === 1) {
  //       calendarData.year[year].month[monthIndex].done.push(day);
  //     } else if (id === 2) {
  //       calendarData.year[year].month[monthIndex].missed.push(day);
  //     }
  //   }

  //   function updateDay(year, monthIndex, day, id) {
  //     if (id === 1) {
  //       calendarData.year[year].month[monthIndex].done.push(day);
  //     } else if (id === 2) {
  //       calendarData.year[year].month[monthIndex].missed.push(day);
  //     }
  //   }
  // };

  // handleWorkoutData(2019, 3, 1, 1);

  return (
    <>
      <div className={styles.background}>
        <MembersNavbar onHandleLogout={handleLogout} />
        <h3 className={styles.date}>Your workout for today - {currentDate}</h3>
        <div className={styles.checkBox}>
          <div className={styles.greenCircleDiv}>
            {workoutDone ? (
              <img src={greenCheckCircle} alt={greenCheckCircle} />
            ) : null}
          </div>
        </div>

        {currentWorkout ? (
          <div className={styles.mainContainer}>
            <div className={styles.exerciseContainer}>
              {panels.current.map((item, index) => (
                <>
                  {dayData === "buttonYellow" && index === 0 ? (
                    <h1 className={styles.restDay}>TODAY IS RESTDAY</h1>
                  ) : currentWorkout[item] ? (
                    <div className={styles.exerciseDiv} key={index}>
                      <div className={styles.exerciseImg} key={index}>
                        <h4 key={index}>
                          {!currentWorkout[item]
                            ? null
                            : currentWorkout[item][0]}
                        </h4>
                        <ul key={index}>
                          <li key={index}>
                            Body Part-:
                            <b>
                              {!currentWorkout[item]
                                ? null
                                : currentWorkout[item][1]}
                            </b>
                          </li>
                          <li key={index}>
                            Sets-:
                            <b>
                              {!currentWorkout[item]
                                ? null
                                : currentWorkout[item][2]}
                            </b>
                          </li>
                          <li key={index}>
                            Repetitions:
                            <b>
                              {!currentWorkout[item]
                                ? null
                                : currentWorkout[item][3]}
                            </b>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </>
              ))}
            </div>
            <div className={styles.buttons}>
              {dayData === "buttonYellow" ? null : (
                <button onClick={handleCheckLastDate} className={styles.redBtn}>
                  Done
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
