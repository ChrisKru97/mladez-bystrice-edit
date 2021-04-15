import React from "react";
import styles from "./Components.module.css";

const Loader: React.FC = () => {
  return (
    <svg width="100" height="100">
      <circle
        className={styles.loader}
        cx="50"
        cy="50"
        r="40"
        stroke="rgba(0, 0, 0, 0.6)"
        fill="none"
        strokeWidth="7"
      />
    </svg>
  );
};

export default Loader;
