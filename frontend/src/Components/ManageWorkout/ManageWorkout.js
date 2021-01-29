import { useHistory } from "react-router-dom";
import { React, useState, useRef, useEffect, useContext } from "react";
import styles from "./manageWorkout.module.css";
import MembersNavbar from "../MembersNavbar/MembersNavbar";
import DayIndicators from "./DayIndicators/DayIndicators";
import ExercisePanels from "./ExercisePanels/ExercisePanels";
import SelectBodyPart from "./SelectBodyPart/SelectBodyPart";
import SelectExercise from "./SelectExercise/SelectExercise";
import { exerciseDataContext } from "../Dashboard/Dashboard";

export default function ManageWorkout() {
  const [workoutData, setWorkoutData] = useState(
    JSON.parse(localStorage.getItem("workoutData")).workout
  );
  console.log("The newest workout data", workoutData.day1.panels);

  // let tempPanels = workoutData["day" + (activeButton + 1)].panels;
  let panels = [];
  const activePanel = useRef();
  const nextExerciseData = useRef([]);
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
  // const [buttonColour, setButtonColour] = useState([
  //   workoutData.day1.button,
  //   workoutData.day2.button,
  //   workoutData.day3.button,
  //   workoutData.day4.button,
  //   workoutData.day5.button,
  //   workoutData.day6.button,
  //   workoutData.day7.button,
  // ]);

  useEffect(() => {
    panels = [];
    workoutData["day" + (activeButton + 1)].panels.forEach((element) => {
      panels.push({ name: element.toString(), id: element.toString() });
    });
    setList(panels);
  }, [activeButton]);

  const handleWorkout = async () => {
    const workoutSaved = {
      workout: {
        day3: {
          exercises: [
            ["pull up", "back", 5, 9],
            ["pull up", "back", 5, 9],
            ["pull up", "back", 5, 9],
          ],
        },
      },
    };
    const workoutData = workoutSaved.workout;

    try {
      const response = await fetch("/dashboard/manageWorkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          workout: workoutData,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   handleWorkout();
  // }, []);

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
  };

  //-------

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
    // console.log("buffer data check", bufferData["day" + (activeButton + 1)]);
    bufferData["day" + (activeButton + 1)].panels = bufferNewList;
    console.log("Buffer with new ordered list", bufferData);
    setWorkoutData(bufferData);
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
        // buttonColour={buttonColour}
        workoutData={workoutData}
      />
      <ExercisePanels
        onEnd={onEnd}
        list={list}
        onHandleSetOverlay={handleSetOverlay}
        exerciseTemp={exerciseTemp}
        activeButton={activeButton}
        // buttonColour={buttonColour}
        onHandleResetPanel={handleResetPanel}
        workoutData={workoutData}
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
