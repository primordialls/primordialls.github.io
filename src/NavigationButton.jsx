import React from 'react';
import styles from './NavigationButton.module.css';

export const NavigationButton = ({ text, onClick, repo }) => {
  return (
    <button className={`${styles.navigationButton} ${repo ? styles.repo : ``}`} onClick={onClick}>
      {text}
    </button>
  );
};