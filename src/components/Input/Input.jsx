// Input.jsx
import React from 'react';
import styles from './Input.module.css';

// Додаємо className до деструктуризації
const Input = React.forwardRef(({ label, type = 'text', error, placeholder, className, ...props }, ref) => {
  return (
    // Припустимо, що зовнішній клас має стилізувати лише сам інпут, а не обгортку inputWrapper.
    <div className={styles.inputWrapper}>
      {label && <label htmlFor={props.name} className={styles.label}>{label}</label>}
      <input
        type={type}
        id={props.name}
        placeholder={placeholder}
        // Об'єднуємо внутрішні стилі з зовнішнім className
        className={`${styles.input} ${error ? styles.inputError : ''} ${className || ''}`} 
        ref={ref}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
});

export default Input;