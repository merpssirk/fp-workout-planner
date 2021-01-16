import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from './exercisePanels.module.css';

export default function ExercisePanels(props) {
    return (
        <div className={styles.exercisePanelsWrapper}>
        <DragDropContext onDragEnd={props.onEnd}>
          <Droppable droppableId="dndId">
            {(provided, snapshot) => (
              <div className={styles.panels} ref={provided.innerRef}>
                {props.list.map((item, index) => (
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
                          <div className={styles.exerciseWrapper}>
                            <div className={styles.exerciseInnerWrapper}>
                            <div className={styles.bodyPartWrapper}>
                              <span className={styles.bodyPart}>Body Part:</span >
                              <span className={styles.bodyPartValue}>Chest</span>
                            </div>
                            <div className={styles.setsWrapper}>
                              <span className={styles.sets}>Sets:</span >
                              <input type="number" name="setsValue" min="1" max="8" className={styles.setsValue} />
                            </div>
                            <div className={styles.repetitionsWrapper}>
                              <span className={styles.repetitions}>Repetitions:</span >
                              <input type="number" name="repetitionsValue" min="1" max="100" className={styles.repetitionsValue} />
                            </div>
                            </div>
                          </div>
                          <button
                            onClick={props.onHandleSetOverlay}
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
    )
}
