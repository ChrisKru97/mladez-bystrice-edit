import React, { ButtonHTMLAttributes } from "react";
import styles from "./Components.module.css";

const Button: React.FC<{
  className?: string;
  title: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
}> = ({ title, type = "button", onClick, className }) => {
  return type === "submit" ? (
    <input type="submit" value={title} className={styles.button} />
  ) : (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      className={className ? `${styles.button} ${className}` : styles.button}
    >
      {title}
    </button>
  );
};

export default Button;
