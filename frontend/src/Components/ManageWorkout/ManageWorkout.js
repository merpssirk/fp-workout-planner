import { useHistory } from "react-router-dom";
import { React, useState, useRef, useEffect } from "react";
import styles from "./manageWorkout.module.css";
import MembersNavbar from "../MembersNavbar/MembersNavbar";
import DayIndicators from "./DayIndicators/DayIndicators";
import ExercisePanels from "./ExercisePanels/ExercisePanels";
import SelectBodyPart from "./SelectBodyPart/SelectBodyPart";

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
  ]
  // const formCheck = useRef("")
  const [list, setList] = useState(panels)
  const [overlayClass, setOverlayClass] = useState("false")
  const [activeButton, setActiveButton] = useState("active0")
  const [radioButton, setRadioButton] = useState("abs")
  const [buttonColour, setButtonColour] = useState(["buttonGrey","buttonGrey","buttonGrey","buttonGrey","buttonGrey","buttonGrey","buttonGrey"]);
  const handleSetOverlay = () => {
    setOverlayClass(!overlayClass)
  }
  const handleRemoveOverlay = (event) => {
    event.preventDefault()
    setOverlayClass(!overlayClass)
  }
  const handleWorkoutApi = (e) => {
    e.preventDefault()
    console.log(radioButton)
  }
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }
  const onEnd = (result) => {
    if (!result.destination) return
    setList(reorder(list, result.source.index, result.destination.index))
  }
  const handleDayButton = (event) => {
    const newColour = [...buttonColour];
    const number = event.id.charAt(event.id.length - 1) - 1
    
    if (activeButton === "active"  +[number]){

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
   }else{
    setActiveButton("active" + number);
   }
  }

  const handleRadioButton = (value)=>{
    setRadioButton(value)
  }

  //LOGOUT
  const history = useHistory()
  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn")
    history.push("/")
  }
  return (
    <div className={styles.background}>
      <MembersNavbar />
      <DayIndicators onHandleDayButton={handleDayButton} activeButton={activeButton} buttonColour={buttonColour}/>
      <ExercisePanels onEnd={onEnd} list={list} onHandleSetOverlay={handleSetOverlay}/>
      <SelectBodyPart overlayClass={overlayClass} onHandleWorkoutApi={handleWorkoutApi} radioButton={radioButton} onHandleRadioButton={handleRadioButton}/>
      
      <div
        id={styles.overlay}
        className={overlayClass ? null : styles.active}
        onClick={handleRemoveOverlay}
      ></div>
    </div>
  )
}
