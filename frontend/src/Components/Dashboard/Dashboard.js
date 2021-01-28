import {
  React,
  useState,
  useRef,
  useEffect,
  useContext,
  createContext,
} from "react"
import { useHistory } from "react-router-dom"
import DayJs from "react-dayjs"

import styles from "./dashboard.module.css"
import MembersNavbar from "../MembersNavbar/MembersNavbar"
import DashDateWeather from "./DashDateWeather/DashDateWeather"
import DashInfoPanel from "./DashInfoPanel/DashInfoPanel"
import DashMainPanels from "./DashMainPanels/DashMainPanels"
import DashFinishRegistration from "./DashFinishRegistration/DashFinishRegistration"
import axios from "axios"
import WeightUpdate from "./WeightUpdate/WeightUpdate"
import { NotificationContext } from "../Notifications/Notifications"
import defaultWorkout from "./WorkoutDatabase"
import dayjs from "dayjs"
//console.log("DefaultDatabase", defaultWorkout)
export const exerciseDataContext = createContext()

export default function Dashboard(props) {
  const setMessage = useContext(NotificationContext)
 // const [getLatestWeight, setGetLatestWeight] = useState([])
  const [getUpdatedTime, setGetUpdatedTime] = useState(Date)
  const [updateMessage, setUpdateMessage] = useState(false)
  const workoutGoals = useRef()
  const workoutData = useRef()
  const [overlayClass, setOverlayClass] = useState(false)
  const [currentDate, setCurrentDate] = useState()
  const formCheck = localStorage.getItem("Register") || null
  const [caloriesValue, setCaloriesValue] = useState(0)
  const [macros, setMacros] = useState([])
  const [weight, setWeight] = useState(0)

  // console.log("Dashboard.js", overlayClass)
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
        //setGetLatestWeight(res.data[0].updatedWeight)
        // console.log("User's updatedWeight", res.data[0].updatedWeight)

        setGetUpdatedTime(res.data[0].timestamps.lastUpdatedAt)

        console.log(
          "user's updated weight time: ",
          res.data[0].timestamps.lastUpdatedAt
        )
        console.log(getUpdatedTime)

        const myDate = dayjs(getUpdatedTime).add(1, "day").format("DD.MM.YYYY")

        console.log(myDate)
        const date = dayjs().format("DD.MM.YYYY")
        console.log(date)
        if (date === myDate) {
          setTimeout(() => {
            setUpdateMessage(true)
          }, 3000)
          console.log("update")
        }
      })
  }, [])

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
      });
      console.log("handleUpdateWeight reached");
      handleRemoveOverlay();
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
        //console.log(data)
        setMainTemp(Math.round(data.main.temp));
        setIconID(data.weather[0].icon);
        setFeelsLike(data.main.feels_like);
        setDescription(data.weather[0].description);
      });

    fetch("/dashboard/defaultWorkout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        workoutData.current = data;

        // props.onHandleWorkoutData(data);
      });
  }, []);

  //---FINISH REGISTRATION PAGE CONNECT TO BACKEND---
  const handleFinishRegistration = async (event) => {
    setMessage("Welcome in your Dashboard Page!!");
    //console.log(setMessage);
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
      //const json = await response.json();
      //console.log("function is reached")
      handleRemoveOverlay();
      handleDefaultWorkout();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDefaultWorkout = async () => {
    try {
      await fetch("/dashboard/defaultWorkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(defaultWorkout),

      });
      localStorage.setItem("workoutData", JSON.stringify(defaultWorkout));
      console.log("After localStorage", defaultWorkout);

    } catch (error) {
      console.log(error);
    }
  };

  //NUTRITION CALCULATION
  // CALCULATE MEN'S BMR
  //const [nutrition, setNutrition] = useState("")

  const calculateBMRForMen = (menWeight, menHeight, menAge) => {
    const weight = 66.47 + 13.75 * menWeight;
    const height = 5.003 * menHeight;
    const age = 6.755 * menAge;
    return weight + height - age;
  };

  // calculateBMRForMen()
  //console.log(calculateBMRForMen(34,178, 23));

  //CALCULATE WOMEN'S BMR
  const calculateBMRForWomen = (womenWeight, womenHeight, womenAge) => {
    const weight = 655.1 + 9.563 * womenWeight;
    const height = 1.85 * womenHeight;
    const age = 4.676 * womenAge;
    return weight + height - age;
  };
  //calculateBMRForWomen()
  //console.log(calculateBMRForWomen())
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
    //console.log('result:', (carbs *4) + (protein *4)+ (fat * 9));
    // console.log(carbs);
    // console.log(carbsPercent)
    // console.log(fatPercent)
    //console.log(proteinPercent)

    setMacros([carbs, protein, fat]);
  }, [caloriesValue]);

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
        <DashInfoPanel />
        <DashMainPanels caloriesValue={caloriesValue} macros={macros} />
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
