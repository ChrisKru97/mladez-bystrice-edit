import React from "react";
import styles from "./Components.module.css";

interface IProps {
  label: string;
  name: string;
  value?: string;
  type?: string;
}

const Input: React.FC<IProps> = ({
  name,
  label,
  value = "",
  type = "text",
}) => {
  return (
    <label htmlFor={name}>
      <span className={styles.inputLabel}>{label}</span>
      {type === "textarea" ? (
        <textarea
          required
          name={name}
          rows={15}
          defaultValue={value}
          className={styles.input}
        />
      ) : (
        <input
          required
          name={name}
          type={type}
          defaultValue={value}
          className={styles.input}
        />
      )}
    </label>
  );
};

export default Input;
