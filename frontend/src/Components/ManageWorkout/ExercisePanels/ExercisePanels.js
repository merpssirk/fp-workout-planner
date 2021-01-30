import { React, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ReactComponent as ResetIcon } from "../../../pics/manageWorkout/times-circle-regular.svg";
import styles from "./exercisePanels.module.css";

export default function ExercisePanels(props) {
  const getSets = useRef([]);
  const getRepetitions = useRef([]);
  const getExercises = useRef(
    props.workoutData["day" + (props.activeButton + 1)].exercises
  );

  useEffect(() => {
    getExercises.current =
      props.workoutData["day" + (props.activeButton + 1)].exercises;
  }, [props]);
  console.log("The active Button is:", getExercises.current);
  console.log(props.workoutData["day" + (props.activeButton + 1)].exercises);

  const resetPanel = (panel) => {
    props.onHandleResetPanel(panel);
  };

  const updateSetsReps = (panel) => {
    props.onHandleSetsReps(
      panel,
      getSets.current[panel - 1],
      getRepetitions.current[panel - 1]
    );
    // console.log("Value of the sets", getSets.current[panel - 1]);
  };

  switch (props.workoutData["day" + (props.activeButton + 1)].button) {
    case "buttonGreen":
      return (
        <div className={styles.exercisePanelsWrapper}>
          <DragDropContext onDragEnd={props.onEnd}>
            <Droppable droppableId="dndId">
              {(provided, snapshot) => (
                <div className={styles.panels} ref={provided.innerRef}>
                  {props.list.map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      key={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <>
                          <div
                            className={styles.panel}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h3>
                              {props.workoutData[
                                "day" + (props.activeButton + 1)
                              ].exercises[item.id - 1] === undefined
                                ? null
                                : props.workoutData[
                                    "day" + (props.activeButton + 1)
                                  ].exercises[item.id - 1][0]}
                            </h3>
                            {props.workoutData["day" + (props.activeButton + 1)]
                              .exercises[item.id - 1] === undefined ? null : (
                              <ResetIcon
                                onClick={() => {
                                  resetPanel(item.id);
                                }}
                                className={styles.reset}
                              />
                            )}
                            <div className={styles.exerciseWrapper}>
                              {props.workoutData[
                                "day" + (props.activeButton + 1)
                              ].exercises[item.id - 1] === undefined ? null : (
                                <div className={styles.exerciseInnerWrapper}>
                                  <div className={styles.bodyPartWrapper}>
                                    <span className={styles.bodyPart}>
                                      Body Part:
                                    </span>
                                    <span className={styles.bodyPartValue}>
                                      {
                                        props.workoutData[
                                          "day" + (props.activeButton + 1)
                                        ].exercises[item.id - 1][1]
                                      }
                                    </span>
                                  </div>
                                  <div className={styles.setsWrapper}>
                                    <span className={styles.sets}>Sets:</span>
                                    <input
                                      type="number"
                                      name="setsValue"
                                      value={
                                        props.workoutData[
                                          "day" + (props.activeButton + 1)
                                        ].exercises[item.id - 1][2]
                                      }
                                      onChange={() => {
                                        updateSetsReps(item.id);
                                      }}
                                      min="1"
                                      max="8"
                                      ref={(element) =>
                                        (getSets.current[item.id - 1] = element)
                                      }
                                      className={styles.setsValue}
                                    />
                                  </div>
                                  <div className={styles.repetitionsWrapper}>
                                    <span className={styles.repetitions}>
                                      Repetitions:
                                    </span>
                                    <input
                                      type="number"
                                      name="repetitionsValue"
                                      value={
                                        props.workoutData[
                                          "day" + (props.activeButton + 1)
                                        ].exercises[item.id - 1][3]
                                      }
                                      onChange={() => {
                                        updateSetsReps(item.id);
                                      }}
                                      min="1"
                                      max="100"
                                      ref={(element) =>
                                        (getRepetitions.current[
                                          item.id - 1
                                        ] = element)
                                      }
                                      className={styles.repetitionsValue}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                props.onHandleSetOverlay(item.id);
                              }}
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
          <button
            className={styles.saveButton}
            onClick={props.onUpdateWorkoutData}
          >
            Save
          </button>
        </div>
      );
      break;
    case "buttonYellow":
      return (
        <div className={styles.exercisePanelsWrapper}>
          <h1>RESTDAY</h1>
        </div>
      );
    default:
      return (
        <div className={styles.exercisePanelsWrapper}>
          <h1>NO WORKOUTS SET FOR THIS DAY</h1>
        </div>
      );
      break;
  }
}
