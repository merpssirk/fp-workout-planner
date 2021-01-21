import { React, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ReactComponent as ResetIcon } from "../../../pics/manageWorkout/times-circle-regular.svg";
import styles from "./exercisePanels.module.css";

export default function ExercisePanels(props) {
  const getSets = useRef([]);
  const getRepetitions = useRef([]);
  console.log(props.exerciseTemp[0].exercise);

  const resetPanel = (panel) => {
    props.onHandleResetPanel(
      panel,
      getSets.current[panel - 1],
      getRepetitions.current[panel - 1]
    );
  };

  useEffect(() => {
    console.log(props);
  }, [props]);

  switch (props.buttonColour[props.activeButton]) {
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
                            <h3>{props.exerciseTemp[item.id - 1].exercise}</h3>
                            <ResetIcon
                              onClick={() => {
                                resetPanel(item.id);
                              }}
                              className={styles.reset}
                            />
                            <div className={styles.exerciseWrapper}>
                              {props.exerciseTemp[item.id - 1].exercise ===
                              "" ? null : (
                                <div className={styles.exerciseInnerWrapper}>
                                  <div className={styles.bodyPartWrapper}>
                                    <span className={styles.bodyPart}>
                                      Body Part:
                                    </span>
                                    <span className={styles.bodyPartValue}>
                                      {props.exerciseTemp[item.id - 1].bodyPart}
                                    </span>
                                  </div>
                                  <div className={styles.setsWrapper}>
                                    <span className={styles.sets}>Sets:</span>
                                    <input
                                      type="number"
                                      name="setsValue"
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
          <button className={styles.saveButton}>Save</button>
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
