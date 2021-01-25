import { useHistory } from "react-router-dom";
import { React, useState, useRef, useEffect } from "react";
import styles from "./manageWorkout.module.css";
import MembersNavbar from "../MembersNavbar/MembersNavbar";
import DayIndicators from "./DayIndicators/DayIndicators";
import ExercisePanels from "./ExercisePanels/ExercisePanels";
import SelectBodyPart from "./SelectBodyPart/SelectBodyPart";
import SelectExercise from "./SelectExercise/SelectExercise";

export default function ManageWorkout() {
  // const manageWorkoutData = [
  //   [{ exercise: "", bodyPart: "", sets: 0, repetitons: 0 },
  //   { exercise: "", bodyPart: "", sets: 0, repetitons: 0 },
  //   { exercise: "", bodyPart: "", sets: 0, repetitons: 0 },
  //   { exercise: "", bodyPart: "", sets: 0, repetitons: 0 },
  //   { exercise: "", bodyPart: "", sets: 0, repetitons: 0 },
  //   { exercise: "", bodyPart: "", sets: 0, repetitons: 0 },
  //   { exercise: "", bodyPart: "", sets: 0, repetitons: 0 },],
  //   [{ exercise: "", bodyPart: "", sets: 0, repetitons: 0 },
  //   { exercise: "", bodyPart: "", sets: 0, repetitons: 0 },
  //   { exercise: "", bodyPart: "", sets: 0, repetitons: 0 },
  //   { exercise: "", bodyPart: "", sets: 0, repetitons: 0 },
  //   { exercise: "", bodyPart: "", sets: 0, repetitons: 0 },
  //   { exercise: "", bodyPart: "", sets: 0, repetitons: 0 },
  //   { exercise: "", bodyPart: "", sets: 0, repetitons: 0 },]
  // ];

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

  const activePanel = useRef();
  const [list, setList] = useState(panels);
  const [overlayClass, setOverlayClass] = useState("false");
  const [showPopup, setShowPopup] = useState("false");
  const [activeButton, setActiveButton] = useState(0);
  const [radioButton, setRadioButton] = useState("");
  // const [getExercise, setGetExercise] = useState("");
  const [exerciseTemp, setExerciseTemp] = useState([
    { exercise: "", bodyPart: "", description: "" },
    { exercise: "", bodyPart: "", description: "" },
    { exercise: "", bodyPart: "", description: "" },
    { exercise: "", bodyPart: "", description: "" },
    { exercise: "", bodyPart: "", description: "" },
    { exercise: "", bodyPart: "", description: "" },
    { exercise: "", bodyPart: "", description: "" },
    { exercise: "", bodyPart: "", description: "" },
  ]);
  const [description, setDescription] = useState([]);
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

  // useEffect(()=>{
  //   try {
  //     const response = await fetch("/user/manageWorkout", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify(finishRegistrationField),
  //     })

  //   } catch (err) {
  //     console.log(err)
  //   }
  // })

  const handleSetOverlay = (id) => {
    activePanel.current = id;
    setOverlayClass(!overlayClass);
    setShowPopup("one");
    setDescription("");
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

    if (activeButton === number) {
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
      setActiveButton(number);
    }
  };

  const handleRadioButton = (value) => {
    setRadioButton(value);
  };

  const handleExerciseTemp = (selection) => {
    const buffer = [...exerciseTemp];
    const tempDescription = selection.description.replace(/<[^>]*>/g, "");
    buffer[activePanel.current - 1].exercise = selection.name;
    buffer[activePanel.current - 1].bodyPart = radioButton;
    buffer[activePanel.current - 1].description = tempDescription;
    setExerciseTemp(buffer);

    handleFetchExerciseImage(selection, tempDescription);
    console.log("Complete data of selected exercise:", selection);
  };

  const handleFetchExerciseImage = (selection, tempDescription) => {
    const query = "exercise=" + selection.id;

    fetch(`https://wger.de/api/v2/exerciseimage/?${query}&language=2`)
      .then((res) => res.json())
      .then((data) => {
        const buffer = [...description];
        buffer[0] = tempDescription;
        if (data.results.length > 0) {
          buffer[1] = data.results[0].image;
        } else {
          buffer[1] = "";
        }
        setDescription(buffer);
      });
  };

  const handleResetPanel = (panel, sets, repetitions) => {
    console.log(panel, sets, repetitions);
    const buffer = [...exerciseTemp];
    buffer[panel - 1].exercise = "";
    buffer[panel - 1].bodyPart = "";
    sets.value = "";
    repetitions.value = "";
    setExerciseTemp(buffer);
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
        exerciseTemp={exerciseTemp}
        activeButton={activeButton}
        buttonColour={buttonColour}
        onHandleResetPanel={handleResetPanel}
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
        exerciseTemp={exerciseTemp}
        onHandleExerciseTemp={handleExerciseTemp}
        activePanel={activePanel}
        description={description}
      />
      <div
        id={styles.overlay}
        className={overlayClass ? null : styles.active}
        onClick={handleRemoveOverlay}
      ></div>
    </div>
  );
}
