import React from "react"
import styles from "./WeightUpdate.module.css"
import classNames from "classnames";

export default function WeightUpdate( props ) {
   // console.log("WeightUpdate", props.overlayClass2);

  return (
    <>
      { props.updateMessage ? <div onClick={props.onHandleSetOverlay} className={styles.container}>
        <span>Reminder: Please update your weight!</span>
      </div> : null}
      <div
        className={
          (props.overlayClass && props.formCheck !== "pending")
            ? classNames(styles.formContainer2, styles.active)
            : styles.formContainer2
        }
      >
        <div className={styles.pupopContainer}>
          <h3>
            Please update
            <br /> your weight <br /> every week!
          </h3>
          <form onSubmit={props.onHandleUpdatedWeight}>
            <label>Update Weight</label>
            <input
              type="number"
              name="updatedWeight"
              placeholder="Enter your weight"
              required="required"
            />
            <button type="submit">
              OK
            </button>
          </form>
        </div>
      </div>
      <div
        id={styles.overlay}
        className={props.overlayClass ? styles.active : null }
        onClick={props.onHandleRemoveOverlay}
      ></div>
    </>
  )
}
