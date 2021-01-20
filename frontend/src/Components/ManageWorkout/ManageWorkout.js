import { useHistory } from "react-router-dom";
import { React, useState, useRef, useEffect } from "react";
import styles from "./manageWorkout.module.css";
import MembersNavbar from "../MembersNavbar/MembersNavbar";
import DayIndicators from "./DayIndicators/DayIndicators";
import ExercisePanels from "./ExercisePanels/ExercisePanels";
import SelectBodyPart from "./SelectBodyPart/SelectBodyPart";
import SelectExercise from "./SelectExercise/SelectExercise";

export default function ManageWorkout() {
  const panels = [
    { name: "p1", id: "1" },
    { name: "p2", id: "2" },
    { name: "p3", id: "3" },
    { name: "p4", id: "4" },
    { name: "p5", id: "5" },
    { name: "p6", id: "6" },
    { name: "p7", id: "7" },
    { name: "p8", id: "8" },
  ];

  // const formCheck = useRef("")
  const [list, setList] = useState(panels);
  const [overlayClass, setOverlayClass] = useState("false");
  const [showPopup, setShowPopup] = useState("false");
  const [activeButton, setActiveButton] = useState("active0");
  const [radioButton, setRadioButton] = useState("");
  // const [getExercise, setGetExercise] = useState("");
  const { exerciseTitle, setExerciseTitle } = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [buttonColour, setButtonColour] = useState([
    "buttonGrey",
    "buttonGrey",
    "buttonGrey",
    "buttonGrey",
    "buttonGrey",
    "buttonGrey",
    "buttonGrey",
  ]);

  const handleSetOverlay = (id) => {
    console.log("The id form the panels is:", id);
    setOverlayClass(!overlayClass);
    setShowPopup("one");
  };

  const handleRemoveOverlay = (event) => {
    event.preventDefault();
    setOverlayClass(!overlayClass);
    setShowPopup("false");
  };

  const handleWorkoutApi = (e) => {
    e.preventDefault();
    console.log("radio button", radioButton);

    let query;

    switch (radioButton) {
      case "abs":
        query = "muscles=14&muscles=6";
        break;
      case "arms":
        query = "muscles=1&muscles=11&muscles=13&muscles=5";
        break;
      case "back":
        query = "muscles=8&muscles=12&muscles=9";
        break;
      case "chest":
        query = "muscles=4";
        break;
      case "legs":
        query = "muscles=7&muscles=8&muscles=10&muscles=15";
        break;
      case "shoulders":
        query = "muscles=2&muscles=3";
        break;
      default:
        break;
    }

    fetch(`https://wger.de/api/v2/exercise/?${query}&limit=<50>&language=2`)
      .then((res) => res.json())
      .then((data) => {
        // setGetExercise(query);
        setExerciseData(data.results);
        setShowPopup("two");
      });
  };

  // DRAG AND DROP

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onEnd = (result) => {
    if (!result.destination) return;
    setList(reorder(list, result.source.index, result.destination.index));
  };

  //------------------------------------------------------------------------

  const handleDayButton = (event) => {
    const newColour = [...buttonColour];
    const number = event.id.charAt(event.id.length - 1) - 1;

    if (activeButton === "active" + [number]) {
      if (event.className.includes("buttonGrey")) {
        newColour[number] = "buttonGreen";
        setButtonColour(newColour);
      } else if (event.className.includes("buttonGreen")) {
        newColour[number] = "buttonYellow";
        setButtonColour(newColour);
      } else {
        newColour[number] = "buttonGrey";
        setButtonColour(newColour);
      }
    } else {
      setActiveButton("active" + number);
    }
  };

  const handleRadioButton = (value) => {
    setRadioButton(value);
  };

  const handleExerciseTitle = (title) => {
    console.log("The title of the exercise is:", title);
  };

  //LOGOUT
  const history = useHistory();
  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn");
    history.push("/");
  };

  return (
    <div className={styles.background}>
      <MembersNavbar onHandleLogout={handleLogout} />
      <DayIndicators
        onHandleDayButton={handleDayButton}
        activeButton={activeButton}
        buttonColour={buttonColour}
      />
      <ExercisePanels
        onEnd={onEnd}
        list={list}
        onHandleSetOverlay={handleSetOverlay}
      />
      <SelectBodyPart
        showPopup={showPopup}
        onHandleWorkoutApi={handleWorkoutApi}
        radioButton={radioButton}
        onHandleRadioButton={handleRadioButton}
      />
      <SelectExercise
        showPopup={showPopup}
        onHandleRemoveOverlay={handleRemoveOverlay}
        exerciseData={exerciseData}
        onHandleExerciseTitle={handleExerciseTitle}
      />
      <div
        id={styles.overlay}
        className={overlayClass ? null : styles.active}
        onClick={handleRemoveOverlay}
      ></div>
    </div>
  );
}
