import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef(({ label, type = 'text', error, placeholder, ...props }, ref) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label htmlFor={props.name} className={styles.label}>{label}</label>}
      <input
        type={type}
        id={props.name}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        ref={ref}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
});

export default Input;