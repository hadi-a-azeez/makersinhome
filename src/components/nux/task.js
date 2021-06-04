import React from "react";
import styles from "../css/nux.module.css";
import Tick from "../../assets/checkmark.svg";

const Task = ({
  isLine,
  isCompleted,
  number,
  heading,
  subHeading,
  btnText,
  onClick,
}) => {
  return (
    <div className={styles.card_body}>
      <div className={styles.left_section}>
        <div className={isCompleted ? styles.circle : styles.circle_outline}>
          {isCompleted ? (
            <img src={Tick} className={styles.tick} alt="tick" />
          ) : (
            <h1>{number}</h1>
          )}
        </div>
        {isLine && <div className={styles.line}></div>}
      </div>

      <div className={styles.right_section}>
        <div className={styles.child_section}>
          <h1 className={styles.profile_heading}>
            {isCompleted ? heading.success : heading.incomplete}
          </h1>
          <h1 className={styles.profile_sub_heading}>{subHeading}</h1>
          {isCompleted ? (
            <button
              className={styles.profile_button_disabled}
              onClick={onClick}
              disabled
            >
              {btnText}
            </button>
          ) : (
            <button className={styles.profile_button} onClick={onClick}>
              {btnText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
