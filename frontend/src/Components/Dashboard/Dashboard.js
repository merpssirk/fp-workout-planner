import {
  React,
  useState,
  useRef,
  useEffect,
  useContext,
  createContext,
} from "react";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import styles from "./dashboard.module.css";
import MembersNavbar from "../MembersNavbar/MembersNavbar";
import DashDateWeather from "./DashDateWeather/DashDateWeather";
import DashInfoPanel from "./DashInfoPanel/DashInfoPanel";
import DashMainPanels from "./DashMainPanels/DashMainPanels";
import DashFinishRegistration from "./DashFinishRegistration/DashFinishRegistration";
import axios from "axios";
import WeightUpdate from "./WeightUpdate/WeightUpdate";
import { NotificationContext } from "../Notifications/Notifications";
import defaultWorkout from "./WorkoutDatabase";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(weekday);
export const dailyActivitiesContext = createContext();

export default function Dashboard(props) {
  const [userData, setUserData] = useState({});
  const [workoutData, setWorkoutData] = useState({});
  const setMessage = useContext(NotificationContext);
  const [fetchCheck, setFetchCheck] = useState(false);
  const [exerciseCreated, setExerciseCreated] = useState(0);
  const [getUpdatedTime, setGetUpdatedTime] = useState(Date);
  const [updateMessage, setUpdateMessage] = useState(false);
  const workoutGoals = useRef();
  const [overlayClass, setOverlayClass] = useState(false);
  const [currentDate, setCurrentDate] = useState();
  const formCheck = localStorage.getItem("Register") || null;
  const [caloriesValue, setCaloriesValue] = useState(0);
  const [macros, setMacros] = useState([]);
  const [weight, setWeight] = useState(0);
  const [bodyPart, setBodyPart] = useState([]);
  const [weightChartData, setWeightChartData] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const [weightDifference, setWeightDifference] = useState();
  const [weightDifferenceCalc, setWeightDifferenceCalc] = useState(0);
  const [streak, setStreak] = useState(0);
  const [workoutDays, setWorkoutDays] = useState(0);

  // GET UPDATED WEIGHT FROM MongoDB ------------------------------
  useEffect(() => {
    axios
      .get("dashboard/updatedWeight", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      .then((res) => {
        setGetUpdatedTime(res.data[0].timestamps.lastUpdatedAt);
        setUserData(res.data[0]);
        const myDate = dayjs(getUpdatedTime).add(0, "day").format("DD.MM.YYYY");
        const date = dayjs().format("DD.MM.YYYY");
        if (date === myDate) {
          setTimeout(() => {}, 3000);
          setUpdateMessage(true);
        }
      });
  }, []);

  //POST UDPATED WEIGHT: CONNECT TO BACKEND ------------------------------

  const handleUpdatedWeight = async (event) => {
    event.preventDefault();
    const updatedWeightValue = new FormData(event.target);

    const weekOfYear = dayjs().week();

    const updatedWeightField = parseInt(
      updatedWeightValue.get("updatedWeight")
    );

    try {
      await fetch("/dashboard/updatedWeight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ updatedWeightField, weekOfYear }),
      });
      await updateWeightChart(updatedWeightField, weekOfYear);

      //console.log("handleUpdateWeight reached")
      handleRemoveOverlay();
    } catch (error) {
      console.log(error);
    }
  };

  const updateWeightChart = (updatedWeightField, weekOfYear) => {
    console.log("Weight Chart Data", weightChartData);
    const bufferData = [...weightChartData];
    console.log("The buffer data", bufferData);
    console.log(("The buffer length", bufferData.length));
    bufferData[bufferData.length - 1][0] = updatedWeightField;
    bufferData[bufferData.length - 1][1] = weekOfYear;
    setWeightChartData(bufferData);
  };

  //LOGOUT ------------------------------
  const history = useHistory();
  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn");
    history.push("/");
  };

  useEffect(() => {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    setCurrentDate(new Intl.DateTimeFormat("en-GB", options).format(date));
  });

  //HANDLE THE POPUP WINDOWS ------------------------------

  useEffect(() => {
    if (formCheck === "pending") {
      setOverlayClass(true);
    } else {
      setOverlayClass(false);
    }
  }, []);

  const handleSetOverlay = () => {
    setOverlayClass(true);
  };
  const handleRemoveOverlay = () => {
    setOverlayClass(false);
    localStorage.setItem("Register", "fulfilled");
  };

  //---WEATHER INFORMATION---
  const API_KEY = "fd8bafc7164f93efdf3c8815e92e4f18";
  const [mainTemp, setMainTemp] = useState("");
  const [city, setCity] = useState("Hamburg");
  const [iconID, setIconID] = useState("");
  const [feels_like, setFeelsLike] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},de&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setMainTemp(Math.round(data.main.temp));
        setIconID(data.weather[0].icon);
        setFeelsLike(data.main.feels_like);
        setDescription(data.weather[0].description);
      });
  }, []);

  //---FINISH REGISTRATION PAGE CONNECT TO BACKEND---
  const handleFinishRegistration = async (event) => {
    setMessage("Welcome in your Dashboard Page!!");
    event.preventDefault();
    const formData = new FormData(event.target);

    const finishRegistrationField = {
      gender: formData.get("gender"),
      age: formData.get("age"),
      height: formData.get("height"),
      weight: formData.get("weight"),
      disability: formData.get("disability"),
      workoutGoals: formData.get("workoutGoals"),
      workoutDays: formData.get("workoutDays"),
      activityLevel: formData.get("activityLevel"),
    };
    try {
      const response = await fetch("/dashboard/finishRegistration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(finishRegistrationField),
      });

      await handleDefaultWorkout();
      await getWorkOutData();
      handleRemoveOverlay();
    } catch (err) {
      console.log(err);
    }
  };

  //SET THE DEFAULT WORKOUT TO THE LOCAL STORAGE AND POST IT TO THE DB ------------------------------
  const handleDefaultWorkout = async () => {
    try {
      localStorage.setItem("workoutData", JSON.stringify(defaultWorkout));
      console.log("Default Workout", defaultWorkout);
      await fetch("/dashboard/defaultWorkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(defaultWorkout),
      });
    } catch (error) {
      console.log(error);
    }
  };

  //NUTRITION CALCULATION
  // CALCULATE MEN'S BMR ------------------------------
  const calculateBMRForMen = (menWeight, menHeight, menAge) => {
    const weight = 66.47 + 13.75 * menWeight;
    const height = 5.003 * menHeight;
    const age = 6.755 * menAge;
    return weight + height - age;
  };

  //CALCULATE WOMEN'S BMR ------------------------------
  const calculateBMRForWomen = (womenWeight, womenHeight, womenAge) => {
    const weight = 655.1 + 9.563 * womenWeight;
    const height = 1.85 * womenHeight;
    const age = 4.676 * womenAge;
    return weight + height - age;
  };

  //FETCH DATA AND SET NUTRITION VARIABLES ACCORDING TO THE USER DATA ------------------------------
  useEffect(() => {
    axios
      .get("dashboard/dashboardNutrition", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        workoutGoals.current = res.data[0].workoutGoals;
        setWeight(res.data[0].weight);
        setWeightDifference(res.data[0]);
        let getGender;
        const gender = [calculateBMRForMen, calculateBMRForWomen];
        if (res.data.gender === "male") {
          getGender = gender[0];
        } else {
          getGender = gender[1];
        }

        switch (res.data[0].activityLevel) {
          case "sedentary":
            setCaloriesValue(
              getGender(
                res.data[0].weight,
                res.data[0].height,
                res.data[0].age
              ) * 1.2
            );
            break;
          case "moderately":
            setCaloriesValue(
              getGender(
                res.data[0].weight,
                res.data[0].height,
                res.data[0].age
              ) * 1.55
            );
            break;
          case "active":
            setCaloriesValue(
              getGender(
                res.data[0].weight,
                res.data[0].height,
                res.data[0].age
              ) * 1.725
            );
            break;
          case "extraActive":
            setCaloriesValue(
              getGender(
                res.data[0].weight,
                res.data[0].height,
                res.data[0].age
              ) * 1.9
            );
            break;

          default:
            break;
        }
      });
  }, [overlayClass]);

  // NUTRITION CALCULATION ------------------------------
  useEffect(() => {
    let kcalGoal = 0;
    let protein = 0;
    let fat = 0;
    switch (workoutGoals.current) {
      case "looseWeight":
        kcalGoal = caloriesValue - caloriesValue * 0.2;
        protein = weight;
        fat = weight * 0.4;
        break;
      case "stayFit":
        kcalGoal = caloriesValue;
        protein = weight * 1.2;
        fat = weight * 0.5;
        break;
      case "gainMuscles":
        kcalGoal = caloriesValue + caloriesValue * 0.2;
        protein = weight * 1.5;
        fat = weight * 0.8;
        break;
      default:
        break;
    }
    const proteinPercent = (protein * 4 * 100) / kcalGoal;
    const fatPercent = (fat * 9 * 100) / kcalGoal;
    const carbsPercent = 100 - proteinPercent - fatPercent;
    const carbs = Math.round((caloriesValue * carbsPercent) / 100 / 4);

    setMacros([carbs, protein, fat]);
  }, [caloriesValue]);

  // BODYPART CHART ------------------------------
  useEffect(() => {
    if (workoutData) {
      let bodyParts = [];
      let bodyPartsSum = [];
      for (const day in workoutData.workout) {
        if (!workoutData.workout.hasOwnProperty(day)) {
          continue;
        }
        const flatBodyParts = workoutData.workout[day].exercises.flat();
        bodyParts = flatBodyParts.concat(bodyParts);
      }

      if (bodyParts.length > 0) {
        for (let index = 0; index < 6; index++) {
          const query = ["abs", "arms", "back", "chest", "legs", "shoulders"];

          const result = bodyParts.reduce((arr, curr) => {
            if (curr === query[index]) {
              arr.push(curr);
            }
            return arr;
          }, []);

          bodyPartsSum.push(result.length);
        }
        setBodyPart(bodyPartsSum);
      }
    }
  }, [workoutData]);

  // WEIGHT CHART ------------------------------
  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      const weightData = userData.updatedWeight;
      if (weightData.length > 0) {
        // The weight has already been updated
        const weightSelection = [];
        let initialCount = false;
        for (let index = 0; index < 10; index++) {
          if (weightData.length < 10) {
            // Less than 10 values are available
            if (initialCount === false) {
              const initialWeek = dayjs(userData.timestamps.createdAt).week();
              const initialWeight = [userData.weight, initialWeek];
              weightSelection.push(initialWeight);
              initialCount = true;
            }
            if (index > weightData.length - 1) {
              // Fill empty values with null and subsequent week numbers
              weightSelection.push([null, weightData[0][1] + index]);
            } else {
              // Fill with the values from the database
              weightSelection.push(weightData[index]);
            }
          } else {
            // All 10 weight values are available

            const weight = weightData[weightData.length - 10 + index][0];
            const week = weightData[weightData.length - 10 + index][1];

            weightSelection.push([weight, week]);
          }
        }
        setWeightChartData(weightSelection);
      } else {
        // The weight has never been updated (only initial weight)
        const chartDataBuffer = [...weightChartData];
        const startWeek = dayjs(userData.timestamps.createdAt).week();
        chartDataBuffer[0][0] = userData.weight;
        chartDataBuffer[0][1] = startWeek;
        for (let index = 0; index < 9; index++) {
          chartDataBuffer[index + 1][1] = startWeek + index + 1;
        }

        setWeightChartData(chartDataBuffer);
      }
    }
  }, [userData]);

  //FETCH THE WORKOUT DATA FROM THE DB ------------------------------
  const getWorkOutData = async () => {
    const res = await axios.get("/dashboard/defaultWorkoutTwo", {
      withCredentials: true,
    });
    if (res.data) {
      const arr1 = res.data.workout.day1.exercises;
      const arr1Result = arr1.length;
      const arr2 = res.data.workout.day2.exercises;
      const arr2Result = arr2.length;
      const arr3 = res.data.workout.day3.exercises;
      const arr3Result = arr3.length;
      const arr5 = res.data.workout.day5.exercises;
      const arr5Result = arr5.length;
      const arr6 = res.data.workout.day6.exercises;
      const arr6Result = arr6.length;
      setExerciseCreated(
        arr1Result + arr2Result + arr3Result + arr5Result + arr6Result
      );
      setWorkoutData(res.data);
    }
  };
  useEffect(() => {
    getWorkOutData();
  }, []);

  const [printMessage, setPrintMessage] = useState("Difference");

  //HANDLE WEIGHT DIFFERENT ------------------------------
  const handleWeightDifferent = () => {
    console.log(weightDifference);
    if (weightDifference && weightDifference.updatedWeight.length !== 0) {
      const initialWeight = weightDifference.weight;

      const lastUpdatedWeight = weightDifference.updatedWeight;
      const lastUpdatedWeightResult = lastUpdatedWeight.slice(-1).pop()[0];

      if (initialWeight < lastUpdatedWeightResult) {
        setPrintMessage("gained");
      } else if (initialWeight > lastUpdatedWeightResult) {
        setPrintMessage("lost");
      }
      setWeightDifferenceCalc(
        Math.abs(lastUpdatedWeightResult - initialWeight)
      );
    }
  };

  useEffect(() => {
    handleWeightDifferent();
  }, [weightDifference]);

  // MISSED DAYS ------------------------------
  const handleMissedDays = () => {
    if (
      Object.keys(userData).length !== 0 &&
      Object.keys(workoutData).length !== 0
    ) {
      const restDays = [];
      let counter = 0;
      // Find the restdays
      for (const day in workoutData.workout) {
        if (!workoutData.workout.hasOwnProperty(day)) {
          continue;
        }
        if (workoutData.workout[day].button === "buttonYellow") {
          restDays.push(counter);
        }
        counter++;
      }

      const firstWorkoutDay = dayjs(userData.timestamps.startWorkoutAt);
      const startDayOfWeek = dayjs(firstWorkoutDay).day();
      console.log("initial restdays", restDays);
      // Set the weekday of the restdays according to the start date
      for (let index = 0; index < restDays.length; index++) {
        if (restDays[index] + startDayOfWeek === 7) {
          restDays[index] = 0;
        } else if (restDays[index] + startDayOfWeek > 6) {
          restDays[index] = restDays[index] + startDayOfWeek - 7;
        } else {
          restDays[index] = restDays[index] + startDayOfWeek;
        }
      }

      // Find the day of the last activity
      let lastDoneWorkout;
      let lastMissedWorkout;

      if (userData.timestamps.doneWorkout.length > 0) {
        lastDoneWorkout = dayjs(
          userData.timestamps.doneWorkout[
            userData.timestamps.doneWorkout.length - 1
          ]
        );
      } else {
        lastDoneWorkout = dayjs("2021-01-01");
      }

      if (userData.timestamps.missedWorkout.length > 0) {
        lastMissedWorkout = dayjs(
          userData.timestamps.missedWorkout[
            userData.timestamps.missedWorkout.length - 1
          ]
        );
      } else {
        lastMissedWorkout = dayjs("2021-01-01");
      }

      const startDay = Math.max(
        firstWorkoutDay,
        lastDoneWorkout,
        lastMissedWorkout
      );

      // Validate if the day was a restday, else save as missed
      const missedDays = [];
      const yesterday = dayjs().add(-1, "day");
      const dayDifference = dayjs(yesterday).diff(dayjs(startDay), "day");
      if (dayDifference > 1) {
        let check = false;
        for (let index1 = 0; index1 < dayDifference; index1++) {
          for (let index2 = 0; index2 < restDays.length; index2++) {
            if (dayjs(startDay).add(index1, "day").day() === restDays[index2]) {
              check = true;
            }
          }
          if (check === false) {
            const missedDate = dayjs(startDay)
              .add(index1, "day")
              .format("YYYY/MM/DD");
            const jsDate = new Date(missedDate);
            missedDays.push(jsDate);
          }
          check = false;
        }
        console.log(missedDays);
        const userDataBuffer = { ...userData };
        userDataBuffer.timestamps.missedWorkout = missedDays;
        console.log("Updated userData", userDataBuffer);
      }
    }
  };

  // STREAK ------------------------------
  const handleStreak = () => {
    if (Object.keys(userData).length !== 0) {
      // A missed date available
      if (userData.timestamps.missedWorkout.length > 0) {
        const lastMissedDay =
          userData.timestamps.missedWorkout[
            userData.timestamps.missedWorkout.length - 1
          ];

        const today = new Date();
        const diff = today.getTime() - lastMissedDay.getTime();
        const dayDiff = Math.ceil(diff / (1000 * 3600 * 24));
        setStreak(dayDiff);
      } else {
        // No missed date but a done workout available
        if (userData.timestamps.doneWorkout.length > 0) {
          const lastMissedDay = userData.timestamps.doneWorkout[0];
          const today = new Date();
          const dayDiff = dayjs(today).diff(dayjs(lastMissedDay), "day");
          setStreak(dayDiff);
        } else {
          // No missed date and no done workout available
          const lastMissedDay = userData.timestamps.startWorkoutAt;
          const today = new Date();
          const dayDiff = dayjs(today).diff(dayjs(lastMissedDay), "day");
          console.log("Else section reached");
          console.log("Streak", dayDiff);
          setStreak(dayDiff);
        }
      }
    }
  };

  // CALCULATE THE DONE WORKOUTS FOR THE CURRENT MONTH
  const handleWorkoutDone = () => {
    if (Object.keys(userData).length !== 0) {
      if (userData.timestamps.doneWorkout.length > 0) {
        const totalWorkouts = userData.timestamps.doneWorkout.length;
        const dayToCheck = userData.timestamps.doneWorkout;
        let workoutDaysBuffer = 0;
        for (let index = totalWorkouts - 1; index >= 0; index--) {
          if (dayjs().month() === dayjs(dayToCheck[index]).month()) {
            workoutDaysBuffer++;
          } else {
            setWorkoutDays(workoutDaysBuffer);
            break;
          }
        }
      } else {
        setWorkoutDays(0);
      }
    }
  };

  useEffect(() => {
    handleMissedDays();
    handleStreak();
    handleWorkoutDone();
  }, [userData, workoutData]);

  return (
    <div className={styles.background}>
      <MembersNavbar onHandleLogout={handleLogout} />
      <DashDateWeather
        currentDate={currentDate}
        iconID={iconID}
        city={city}
        mainTemp={mainTemp}
        feels_like={feels_like}
        description={description}
      />
      <main className={styles.panel}>
        <DashInfoPanel
          exerciseCreated={exerciseCreated}
          weightDifferenceCalc={weightDifferenceCalc}
          printMessage={printMessage}
          streak={streak}
          workoutDays={workoutDays}
        />
        <DashMainPanels
          caloriesValue={caloriesValue}
          macros={macros}
          bodyPart={bodyPart}
          weightChartData={weightChartData}
        />
        <DashFinishRegistration
          overlayClass={overlayClass}
          formCheck={formCheck}
          onHandleFinishRegistration={handleFinishRegistration}
          onHandleRemoveOverlay={handleRemoveOverlay}
        />
        <WeightUpdate
          onHandleSetOverlay={handleSetOverlay}
          onHandleRemoveOverlay={handleRemoveOverlay}
          overlayClass={overlayClass}
          onHandleUpdatedWeight={handleUpdatedWeight}
          formCheck={formCheck}
          updateMessage={updateMessage}
        />
      </main>
    </div>
  );
}
