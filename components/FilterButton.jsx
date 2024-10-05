import React from "react";
import styles from "../css/characterfilters.module.css";

function FilterButton({ onClick, isPressed, children, ariaLabel, filter }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.buttonNormal} ${filter ? (isPressed ? styles.buttonPressed : styles.notPressed) : ''}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default FilterButton;
