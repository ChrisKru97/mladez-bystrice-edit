import React from "react";
import styles from "./Components.module.css";

interface IProps {
  title: string;
  onClick?: (e: React.MouseEvent) => void;
}

const MenuButton: React.FC<IProps> = ({ title, onClick }) => (
  <button className={styles.menuButton} type="button" onClick={onClick}>
    {title}
  </button>
);

export default MenuButton;
