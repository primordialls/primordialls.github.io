import React from 'react';
import styles from './NavigationButton.module.css';

export const NavigationButton = ({ text, isHovered, onClick }) => {
  return (
    <button className={`${styles.navigationButton} `} onClick={onClick}>
      {text}
    </button>
  );
};