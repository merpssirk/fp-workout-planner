import { React, useRef } from "react";
import classNames from "classnames";
import styles from "./dayIndicators.module.css";

export default function DayIndicators(props) {
  let getDayButton = useRef([]);

  return (
    <div className={styles.dayIndicators}>
      <div className={styles.day1}>
        <h3>DAY 1</h3>
        <button
          onClick={(e) => {
            props.onHandleDayButton(e.target);
          }}
          ref={getDayButton.current[0]}
          className={
            props.activeButton === 0
              ? classNames(styles[props.buttonColour[0]], styles.activeButton)
              : styles[props.buttonColour[0]]
          }
          id="day1"
        ></button>
      </div>
      <div className={styles.day2}>
        <h3>DAY 2</h3>
        <button
          onClick={(e) => {
            props.onHandleDayButton(e.target);
          }}
          ref={getDayButton.current[1]}
          className={
            props.activeButton === 1
              ? classNames(styles[props.buttonColour[1]], styles.activeButton)
              : styles[props.buttonColour[1]]
          }
          id="day2"
        ></button>
      </div>
      <div className={styles.day3}>
        <h3>DAY 3</h3>
        <button
          onClick={(e) => {
            props.onHandleDayButton(e.target);
          }}
          ref={getDayButton.current[2]}
          className={
            props.activeButton === 2
              ? classNames(styles[props.buttonColour[2]], styles.activeButton)
              : styles[props.buttonColour[2]]
          }
          id="day3"
        ></button>
      </div>
      <div className={styles.day4}>
        <h3>DAY 4</h3>
        <button
          onClick={(e) => {
            props.onHandleDayButton(e.target);
          }}
          ref={getDayButton.current[3]}
          className={
            props.activeButton === 3
              ? classNames(styles[props.buttonColour[3]], styles.activeButton)
              : styles[props.buttonColour[3]]
          }
          id="day4"
        ></button>
      </div>
      <div className={styles.day5}>
        <h3>DAY 5</h3>
        <button
          onClick={(e) => {
            props.onHandleDayButton(e.target);
          }}
          ref={getDayButton.current[4]}
          className={
            props.activeButton === 4
              ? classNames(styles[props.buttonColour[4]], styles.activeButton)
              : styles[props.buttonColour[4]]
          }
          id="day5"
        ></button>
      </div>
      <div className={styles.day6}>
        <h3>DAY 6</h3>
        <button
          onClick={(e) => {
            props.onHandleDayButton(e.target);
          }}
          ref={getDayButton.current[5]}
          className={
            props.activeButton === 5
              ? classNames(styles[props.buttonColour[5]], styles.activeButton)
              : styles[props.buttonColour[5]]
          }
          id="day6"
        ></button>
      </div>
      <div className={styles.day7}>
        <h3>DAY 7</h3>
        <button
          onClick={(e) => {
            props.onHandleDayButton(e.target);
          }}
          ref={getDayButton.current[6]}
          className={
            props.activeButton === 6
              ? classNames(styles[props.buttonColour[6]], styles.activeButton)
              : styles[props.buttonColour[6]]
          }
          id="day7"
        ></button>
      </div>
    </div>
  );
}
