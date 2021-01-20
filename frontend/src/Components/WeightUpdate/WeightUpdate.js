import React from "react"
import styles from "./WeightUpdate.module.css"
import classNames from "classnames";

export default function WeightUpdate( props ) {
    
  return (
    <>
      <div onClick={props.onHandleSetOverlay} className={styles.container}>
        <span>Reminder: Please update your weight!</span>
      </div>
      <div
        className={
          props.overlayClass
            ? classNames(styles.formContainer, styles.active)
            : styles.formContainer
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
            <button /* onClick={props.onHandleRemoveOverlay} */ type="submit">
              OK
            </button>
          </form>
        </div>
      </div>
      <div
        id={styles.overlay}
        className={!props.overlayClass ? null : styles.active}
        onClick={props.onHandleRemoveOverlay}
      ></div>
    </>
  )
}
