import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, onClick, type = 'button' }) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;