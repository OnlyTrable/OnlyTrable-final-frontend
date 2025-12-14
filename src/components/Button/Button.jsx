import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, onClick, type = 'button', className, ...props }) => {
  const allClasses = `${styles.button} ${className || ''}`;
  return (
    <button 
    className={allClasses}
    onClick={onClick} 
    type={type}
    {...props}>
      {text}
    </button>
  );
};

export default Button;