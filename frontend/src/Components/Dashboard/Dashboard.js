import {
  React,
  useState,
  useRef,
  useEffect,
  useContext,
  createContext,
} from "react";
import { useHistory } from "react-router-dom";
import DayJs from "react-dayjs";
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

//console.log("DefaultDatabase", defaultWorkout)
export const exerciseDataContext = createContext();

export default function Dashboard(props) {
  const setMessage = useContext(NotificationContext);
  // const [getLatestWeight, setGetLatestWeight] = useState([]
  const [fetchCheck, setFetchCheck] = useState( false )
  const [exerciseCreated, setExerciseCreated] = useState(0)
  const [getUpdatedTime, setGetUpdatedTime] = useState(Date);
  const [updateMessage, setUpdateMessage] = useState(false);
  const workoutGoals = useRef();
  // const workoutData = useRef();
  const [workoutData, setWorkoutData] = useState({});
  const [overlayClass, setOverlayClass] = useState(false);
  const [currentDate, setCurrentDate] = useState();
  const formCheck = localStorage.getItem("Register") || null;
  const [caloriesValue, setCaloriesValue] = useState(0);
  const [macros, setMacros] = useState([]);
  const [weight, setWeight] = useState(0);
  const [bodyPart, setBodyPart] = useState([]);

  // GET UPDATED WEIGHT FROM MongoDB
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

        const myDate = dayjs(getUpdatedTime).add(1, "day").format("DD.MM.YYYY");
        const date = dayjs().format("DD.MM.YYYY");
        if (date === myDate) {
          setTimeout(() => {
            setUpdateMessage(true);
          }, 3000);
        }
      });
  }, []);

  //POST UDPATED WEIGHT: CONNECT TO BACKEND

  const handleUpdatedWeight = async (event) => {
    event.preventDefault();
    const updatedWeightValue = new FormData(event.target);
    const updatedWeightField = {
      updatedWeight: updatedWeightValue.get("updatedWeight"),
    };
    try {
      await fetch("/dashboard/updatedWeight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedWeightField),
      })
      //console.log("handleUpdateWeight reached")
      handleRemoveOverlay()
    } catch (error) {
      console.log(error);
    }
  };

  //LOGOUT
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
        setMainTemp(Math.round(data.main.temp))
        setIconID(data.weather[0].icon)
        setFeelsLike(data.main.feels_like)
        setDescription(data.weather[0].description)
      })

    fetch("/dashboard/defaultWorkout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setWorkoutData(data);
        // props.onHandleWorkoutData(data);
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
      handleRemoveOverlay();
      handleDefaultWorkout();
    } catch (err) {
      console.log(err);
    }
  };
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
  // CALCULATE MEN'S BMR
  const calculateBMRForMen = (menWeight, menHeight, menAge) => {
    const weight = 66.47 + 13.75 * menWeight;
    const height = 5.003 * menHeight;
    const age = 6.755 * menAge;
    return weight + height - age;
  };

  //CALCULATE WOMEN'S BMR
  const calculateBMRForWomen = (womenWeight, womenHeight, womenAge) => {
    const weight = 655.1 + 9.563 * womenWeight;
    const height = 1.85 * womenHeight;
    const age = 4.676 * womenAge;
    return weight + height - age;
  };

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

  useEffect(() => {
    console.log("Workout Data", workoutData.workout);
    let bodyParts = [];
    let bodyPartsSum = [];
    let result;

    for (const day in workoutData.workout) {
      if (!workoutData.workout.hasOwnProperty(day)) {
        continue;
      }
      const flatBodyParts = workoutData.workout[day].exercises.flat();
      bodyParts = flatBodyParts.concat(bodyParts);
    }

    if (bodyParts.length > 0) {
      for (let index = 0; index < 6; index++) {
        let query = ["abs", "arms", "back", "chest", "legs", "shoulders"];

        let result = bodyParts.reduce((arr, curr) => {
          if (curr === query[index]) {
            arr.push(curr);
          }
          return arr;
        }, []);

        bodyPartsSum.push(result.length);
      }
      setBodyPart(bodyPartsSum);
      console.log(bodyPartsSum);
    }
  }, [workoutData]);

  
 /*  useEffect( () => {
    fetch()
    axios
      .get("/dashboard/defaultWorkout", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      .then((res) => {
        console.log(res) */
        /* const arr1 = res.data.workout.day1.exercises
        const arr1Result = arr1.length
       // console.log(arr1Result)

        const arr2 = res.data.workout.day2.exercises
        const arr2Result = arr2.length
       // console.log(arr2Result)

        const arr3 = res.data.workout.day3.exercises
        const arr3Result = arr3.length
        //console.log(arr3Result)

         const arr4 = res.data.workout.day4.exercises
        const arr4Result = arr4.length
        console.log(arr4Result) 

         const arr5 = res.data.workout.day5.exercises
        const arr5Result = arr5.length
       // console.log(arr5Result)

        const arr6 = res.data.workout.day6.exercises
        const arr6Result = arr6.length
        //console.log(arr6Result) 

         const arr7 = res.data.workout.day7.exercises
        const arr7Result = arr7.length
        console.log(arr7Result) 
 
        setExerciseCreated(
          arr1Result + arr2Result + arr3Result + arr5Result + arr6Result
        )
        console.log(exerciseCreated) */ 
 /*      })
  }, []) */
  
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
        <DashInfoPanel exerciseCreated={exerciseCreated} />     
        <DashMainPanels
          caloriesValue={caloriesValue}
          macros={macros}
          bodyPart={bodyPart}
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
      <exerciseDataContext.Provider
        value={workoutData.current}
      ></exerciseDataContext.Provider>
    </div>
  );
}
