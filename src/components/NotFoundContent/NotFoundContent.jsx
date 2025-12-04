import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./NotFoundContent.module.css";
import ichgramImage from "../../assets/images/ichgram.png"; 

const NotFoundContent = () => {
    
    return (
        <div className={styles.container}>         
            {/* Ліва секція: Зображення телефонів */}
            <div className={styles.imageContainer}>
                
                  <img src={ichgramImage} alt="ICHGRAM Mobile App Preview" className={styles.appImage} />
            </div>
            <div className={styles.textContainer}>
                {/* Головний заголовок */}
                <h1 className={styles.mainTitle}>
                    Oops! Page Not Found (404 Error)
                </h1>

                {/* Опис помилки */}
                <p className={styles.description}>
                    We're sorry, but the page you're looking for doesn't seem to exist.

                </p>
                <p className={styles.description}>
                    If you typed the URL manually, please double-check the spelling.
                    If you clicked on a link, it may be outdated or broken.
                </p>
            </div>
        </div>
    );
};

export default NotFoundContent;