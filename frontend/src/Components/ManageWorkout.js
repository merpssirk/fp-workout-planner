import { useHistory } from "react-router-dom";
import { React, useState, useRef, useEffect } from "react";
import styles from "../modules/manageWorkout.module.css";
import imgLogo from "../pics/dashboard/Logo-black.png";
import avatar from "../pics/dashboard/Avatar-male.png";
import classNames from "classnames";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  const formCheck = useRef("");
  const [list, setList] = useState(panels);
  const [overlayClass, setOverlayClass] = useState("false");
  const [activeButton, setActiveButton] = useState("active0");
  const [radioButton, setRadioButton] = useState("abs");
  const [dayButtonColour0, setDayButtonColour0] = useState("buttonGrey");
  const [dayButtonColour1, setDayButtonColour1] = useState("buttonGrey");
  const [dayButtonColour2, setDayButtonColour2] = useState("buttonGrey");
  const [dayButtonColour3, setDayButtonColour3] = useState("buttonGrey");
  const [dayButtonColour4, setDayButtonColour4] = useState("buttonGrey");
  const [dayButtonColour5, setDayButtonColour5] = useState("buttonGrey");
  const [dayButtonColour6, setDayButtonColour6] = useState("buttonGrey");
  let getDayButton = useRef([]);

  const handleSetOverlay = () => {
    setOverlayClass(!overlayClass);
  };

  const handleRemoveOverlay = (event) => {
    event.preventDefault();
    setOverlayClass(!overlayClass);
  };

  const handleWorkoutApi = (e) => {
    e.preventDefault();
    console.log(radioButton);
  };

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

  const handleDayButton = (event) => {
    const names = [
      setDayButtonColour0,
      setDayButtonColour1,
      setDayButtonColour2,
      setDayButtonColour3,
      setDayButtonColour4,
      setDayButtonColour5,
      setDayButtonColour6,
    ];
    const number = event.id.charAt(event.id.length - 1) - 1;
    setActiveButton("active" + number);
    console.log("Active button is: ", activeButton);

    if (event.className.includes("buttonGrey")) {
      console.log(number);
      names[number]("buttonGreen");
    } else if (event.className.includes("buttonGreen")) {
      console.log("yellow");
      console.log(event);
      names[number]("buttonYellow");
    } else {
      console.log("grey");
      console.log(event);
      names[number]("buttonGrey");
    }
    console.log(event.className);
  };

  //LOGOUT
  const history = useHistory();
  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn");
    history.push("/");
  };

  return (
    <div className={styles.background}>
      <nav className={styles.navBar}>
        <ul>
          <a href="/dashboard">
            <img src={imgLogo} />
          </a>
          <li>
            <a href="/manageWorkout">Edit Workout</a>
          </li>
          <li>
            <a href="/dailyactivities">Daily Activties</a>
          </li>
          <li>
            <a href="/workoutoverview">Workout Overview</a>
          </li>
        </ul>
        <div className={styles.profileWrapper}>
          <span onClick={handleLogout}>Name</span>
          <a href="/userpage">
            <img src={avatar} />
          </a>
        </div>
      </nav>
      <div className={styles.dayIndicators}>
        <div className={styles.day1}>
          <h3>DAY 1</h3>
          <button
            onClick={(e) => {
              handleDayButton(e.target);
            }}
            ref={getDayButton.current[0]}
            className={
              activeButton === "active0"
                ? classNames(styles[dayButtonColour0], styles.activeButton)
                : styles[dayButtonColour0]
            }
            id="day1"
          ></button>
        </div>
        <div className={styles.day2}>
          <h3>DAY 2</h3>
          <button
            onClick={(e) => {
              handleDayButton(e.target);
            }}
            ref={getDayButton.current[1]}
            className={
              activeButton === "active1"
                ? classNames(styles[dayButtonColour1], styles.activeButton)
                : styles[dayButtonColour1]
            }
            id="day2"
          ></button>
        </div>
        <div className={styles.day3}>
          <h3>DAY 3</h3>
          <button
            onClick={(e) => {
              handleDayButton(e.target);
            }}
            ref={getDayButton.current[2]}
            className={
              activeButton === "active2"
                ? classNames(styles[dayButtonColour2], styles.activeButton)
                : styles[dayButtonColour2]
            }
            id="day3"
          ></button>
        </div>
        <div className={styles.day4}>
          <h3>DAY 4</h3>
          <button
            onClick={(e) => {
              handleDayButton(e.target);
            }}
            ref={getDayButton.current[3]}
            className={
              activeButton === "active3"
                ? classNames(styles[dayButtonColour3], styles.activeButton)
                : styles[dayButtonColour3]
            }
            id="day4"
          ></button>
        </div>
        <div className={styles.day5}>
          <h3>DAY 5</h3>
          <button
            onClick={(e) => {
              handleDayButton(e.target);
            }}
            ref={getDayButton.current[4]}
            className={
              activeButton === "active4"
                ? classNames(styles[dayButtonColour4], styles.activeButton)
                : styles[dayButtonColour4]
            }
            id="day5"
          ></button>
        </div>
        <div className={styles.day6}>
          <h3>DAY 6</h3>
          <button
            onClick={(e) => {
              handleDayButton(e.target);
            }}
            ref={getDayButton.current[5]}
            className={
              activeButton === "active5"
                ? classNames(styles[dayButtonColour5], styles.activeButton)
                : styles[dayButtonColour5]
            }
            id="day6"
          ></button>
        </div>
        <div className={styles.day7}>
          <h3>DAY 7</h3>
          <button
            onClick={(e) => {
              handleDayButton(e.target);
            }}
            ref={getDayButton.current[6]}
            className={
              activeButton === "active6"
                ? classNames(styles[dayButtonColour6], styles.activeButton)
                : styles[dayButtonColour6]
            }
            id="day7"
          ></button>
        </div>
      </div>
      <div className={styles.exercisePanelsWrapper}>
        <DragDropContext onDragEnd={onEnd}>
          <Droppable droppableId="dndId">
            {(provided, snapshot) => (
              <div className={styles.panels} ref={provided.innerRef}>
                {list.map((item, index) => (
                  <Draggable draggableId={item.id} key={item.id} index={index}>
                    {(provided, snapshot) => (
                      <>
                        <div
                          className={styles.panel}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <h3>Exercise {item.id}</h3>
                          <div>{item.name}</div>
                          <button
                            onClick={handleSetOverlay}
                            className={styles.addSign}
                            id={item.id}
                            key={item.id}
                          ></button>
                        </div>
                      </>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button className={styles.saveButton}>Save</button>
      </div>
      <div
        className={
          !overlayClass
            ? classNames(styles.formContainer, styles.active)
            : styles.formContainer
        }
      >
        <h4>
          Select the body part to search <br />
          an exercise for!
        </h4>
        <form onSubmit={handleWorkoutApi} className={styles.muscles}>
          <div className={styles.muscleOptions}>
            <input
              type="radio"
              id="abs"
              name="muscles"
              value="abs"
              checked={radioButton === "abs"}
              onChange={(e) => {
                setRadioButton(e.target.value);
              }}
            />
            <label for="abs">Abs</label>
          </div>
          <div className={styles.muscleOptions}>
            <input
              type="radio"
              id="arms"
              name="muscles"
              value="arms"
              checked={radioButton === "arms"}
              onChange={(e) => {
                setRadioButton(e.target.value);
              }}
            />
            <label for="arms">Arms</label>
          </div>
          <div className={styles.muscleOptions}>
            <input
              type="radio"
              id="back"
              name="muscles"
              value="back"
              checked={radioButton === "back"}
              onChange={(e) => {
                setRadioButton(e.target.value);
              }}
            />
            <label for="back">Back</label>
          </div>
          <div className={styles.muscleOptions}>
            <input
              type="radio"
              id="biceps"
              name="muscles"
              value="biceps"
              checked={radioButton === "biceps"}
              onChange={(e) => {
                setRadioButton(e.target.value);
              }}
            />
            <label for="biceps">Biceps</label>
          </div>
          <div className={styles.muscleOptions}>
            <input
              type="radio"
              id="chest"
              name="muscles"
              value="chest"
              checked={radioButton === "chest"}
              onChange={(e) => {
                setRadioButton(e.target.value);
              }}
            />
            <label for="chest">Chest</label>
          </div>
          <div className={styles.muscleOptions}>
            <input
              type="radio"
              id="Legs"
              name="muscles"
              value="legs"
              checked={radioButton === "legs"}
              onChange={(e) => {
                setRadioButton(e.target.value);
              }}
            />
            <label for="Legs">Legs</label>
          </div>
          <div className={styles.muscleOptions}>
            <input
              type="radio"
              id="Shoulders"
              name="muscles"
              value="shoulders"
              checked={radioButton === "shoulders"}
              onChange={(e) => {
                setRadioButton(e.target.value);
              }}
            />
            <label for="shoulders">Shoulders</label>
          </div>
          <input type="submit" value="OK" />
        </form>
      </div>
      <div
        id={styles.overlay}
        className={overlayClass ? null : styles.active}
        onClick={handleRemoveOverlay}
      ></div>
    </div>
  );
}

// onClick={handleRemoveOverlay}
