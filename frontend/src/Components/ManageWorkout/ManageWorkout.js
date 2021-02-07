import { useHistory } from "react-router-dom";
import { React, useState, useRef, useEffect } from "react";
import styles from "./manageWorkout.module.css";
import MembersNavbar from "../MembersNavbar/MembersNavbar";
import DayIndicators from "./DayIndicators/DayIndicators";
import ExercisePanels from "./ExercisePanels/ExercisePanels";
import SelectBodyPart from "./SelectBodyPart/SelectBodyPart";
import SelectExercise from "./SelectExercise/SelectExercise";

export default function ManageWorkout() {
  const [workoutData, setWorkoutData] = useState(
    JSON.parse(localStorage.getItem("workoutData")).workout
  );
  console.log(
    "Raw data from the localStorage",
    JSON.parse(localStorage.getItem("workoutData"))
  );
  console.log("Workout data reduced", workoutData);

  let panels = [];
  const activePanel = useRef();
  const nextExerciseData = useRef([]);
  const [list, setList] = useState(panels);
  const [overlayClass, setOverlayClass] = useState("false");
  const [showPopup, setShowPopup] = useState("false");
  const [activeButton, setActiveButton] = useState(0);
  const [radioButton, setRadioButton] = useState("");
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

  useEffect(() => {
    panels = [];
    workoutData["day" + (activeButton + 1)].panels.forEach((element) => {
      panels.push({ name: element.toString(), id: element.toString() });
    });
    setList(panels);
  }, [activeButton]);

  const updateWorkoutData = async () => {
    const fullData = JSON.parse(localStorage.getItem("workoutData"));
    fullData.workout = workoutData;
    localStorage.setItem("workoutData", JSON.stringify(fullData));
    // try {
    //   const response = await fetch("/dashboard/manageWorkout", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //     body: JSON.stringify({
    //       workout: workoutData,
    //     }),
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

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
    let equipment = JSON.parse(localStorage.getItem("equipment"));
    if (equipment) {
      equipment = "";
    } else {
      equipment = "&equipment=4&equipment=7";
    }
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
    fetch(
      `https://wger.de/api/v2/exercise/?${query}&limit=<50>&language=2${equipment}`
    )
      .then((res) => res.json())
      .then((data) => {
        // setGetExercise(query);
        setExerciseData(data.results);
        setShowPopup("two");
        if (data.hasOwnProperty("next")) {
          nextExerciseData.current[0] = data.next;
        }

        if (data.hasOwnProperty("previous")) {
          nextExerciseData.current[1] = data.previous;
        }
      });
  };

  const handleNextExercise = (event) => {
    let query;

    switch (event.textContent) {
      case "Next":
        query = nextExerciseData.current[0];
        break;
      case "Previous":
        query = nextExerciseData.current[1];
        break;
      default:
        break;
    }

    fetch(query)
      .then((res) => res.json())
      .then((data) => {
        setExerciseData(data.results);
        if (data.hasOwnProperty("next")) {
          nextExerciseData.current[0] = data.next;
        }

        if (data.hasOwnProperty("previous")) {
          nextExerciseData.current[1] = data.previous;
        }
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
    console.log(list);
  };

  //-------

  useEffect(() => {
    // Update the workout data after drag and drop was used
    const bufferList = [];
    const bufferData = { ...workoutData };
    console.log(list);
    list.map((item) => bufferList.push(item.name));
    bufferData["day" + (activeButton + 1)].panels = bufferList;
    setWorkoutData(bufferData);
  }, [list]);

  const handleDayButton = (event) => {
    const updateWorkoutData = { ...workoutData };
    handleUpdatePanels();
    const number = parseInt(event.id.charAt(event.id.length - 1) - 1);

    if (activeButton === number) {
      if (event.className.includes("buttonGrey")) {
        updateWorkoutData["day" + (number + 1)].button = "buttonGreen";
        setWorkoutData(updateWorkoutData);
      } else if (event.className.includes("buttonGreen")) {
        updateWorkoutData["day" + (number + 1)].button = "buttonYellow";
        setWorkoutData(updateWorkoutData);
      } else {
        updateWorkoutData["day" + (number + 1)].button = "buttonGrey";
        setWorkoutData(updateWorkoutData);
      }
    } else {
      setActiveButton(number);
    }
  };

  const handleUpdatePanels = () => {
    const bufferNewList = [];
    const bufferList = [...list];
    const bufferData = { ...workoutData };
    console.log("list before update", list);
    console.log("...", workoutData["day" + (activeButton + 1)].panels);
    console.log("Buffer list", bufferList);

    bufferList.forEach((element) => {
      bufferNewList.push(parseInt(element.name));
    });
    bufferData["day" + (activeButton + 1)].panels = bufferNewList;
    console.log("Buffer with new ordered list", bufferData);
    setWorkoutData(bufferData);
  };

  const handleRadioButton = (value) => {
    setRadioButton(value);
  };

  const handleExerciseTemp = (selection) => {
    const buffer = [...exerciseTemp];
    const bufferData = { ...workoutData };
    const tempDescription = selection.description.replace(/<[^>]*>/g, "");
    buffer[activePanel.current - 1].exercise = selection.name;
    buffer[activePanel.current - 1].bodyPart = radioButton;
    buffer[activePanel.current - 1].description = tempDescription;

    if (
      !bufferData["day" + (activeButton + 1)].exercises[activePanel.current - 1]
    ) {
      bufferData["day" + (activeButton + 1)].exercises[
        activePanel.current - 1
      ] = [];
    }
    bufferData["day" + (activeButton + 1)].exercises[
      activePanel.current - 1
    ][0] = selection.name;
    bufferData["day" + (activeButton + 1)].exercises[
      activePanel.current - 1
    ][1] = radioButton;
    setExerciseTemp(buffer);
    setWorkoutData(bufferData);

    handleFetchExerciseImage(selection, tempDescription);
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

  const handleSetsReps = (panel, sets, reps) => {
    const bufferData = { ...workoutData };
    bufferData["day" + (activeButton + 1)].exercises[panel - 1][2] = sets.value;
    bufferData["day" + (activeButton + 1)].exercises[panel - 1][3] = reps.value;
    console.log(bufferData);
    setWorkoutData(bufferData);
  };

  const handleResetPanel = (panel) => {
    const bufferData = { ...workoutData };

    bufferData["day" + (activeButton + 1)].exercises.splice([panel - 1], 1);
    bufferData["day" + (activeButton + 1)].panels.splice([panel - 1], 1);
    setWorkoutData(bufferData);

    panels = [];
    bufferData["day" + (activeButton + 1)].panels.forEach((element) => {
      console.log("Element", element);
      console.log("Panel", panel);
      if (element > panel) {
        const newElement = element - 1;
        console.log("New Element", newElement);
        panels.push({ name: newElement.toString(), id: newElement.toString() });
      } else {
        panels.push({ name: element.toString(), id: element.toString() });
      }
    });
    console.log("List", list);
    console.log(
      "Panels after splice",
      bufferData["day" + (activeButton + 1)].panels
    );
    console.log("Panels", panels);

    setList(panels);
  };

  const handleAddPanel = () => {
    const bufferData = { ...workoutData };
    const newPanel = bufferData["day" + (activeButton + 1)].panels.length + 1;
    bufferData["day" + (activeButton + 1)].panels.push(newPanel.toString());
    setWorkoutData(bufferData);

    panels = [];
    workoutData["day" + (activeButton + 1)].panels.forEach((element) => {
      panels.push({ name: element.toString(), id: element.toString() });
    });
    setList(panels);
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
        workoutData={workoutData}
      />
      <ExercisePanels
        onEnd={onEnd}
        list={list}
        onHandleSetOverlay={handleSetOverlay}
        exerciseTemp={exerciseTemp}
        activeButton={activeButton}
        onHandleSetsReps={handleSetsReps}
        onHandleResetPanel={handleResetPanel}
        workoutData={workoutData}
        onUpdateWorkoutData={updateWorkoutData}
        onHandleAddPanel={handleAddPanel}
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
        onHandleNextExercise={handleNextExercise}
      />

      <div
        id={styles.overlay}
        className={overlayClass ? null : styles.active}
        onClick={handleRemoveOverlay}
      ></div>
    </div>
  );
}
