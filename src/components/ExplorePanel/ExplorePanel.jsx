import React from 'react';
import styles from './ExplorePanel.module.css';

const ExplorePanel = () => {
  return (
    <div className={styles.explorePanel}>
      {/* Верхній грід */}
      <div className={styles.grid}>
        <div className={`${styles.gridItem} ${styles.item1}`}>
          {/* Розмір 317x317, random=1 для унікальності */}
          <img src="https://picsum.photos/317/317?random=1" alt="explore content 1" />
        </div>
        <div className={`${styles.gridItem} ${styles.item2}`}>
          <img src="https://picsum.photos/317/317?random=2" alt="explore content 2" />
        </div>
        {/* Велике зображення праворуч */}
        <div className={`${styles.gridItem} ${styles.largeItem} ${styles.item3}`}>
          {/* Розмір 317x638 для подвійної висоти */}
          <img src="https://picsum.photos/317/638?random=3" alt="explore content 3" />
        </div>
        <div className={`${styles.gridItem} ${styles.item4}`}>
          <img src="https://picsum.photos/317/317?random=4" alt="explore content 4" />
        </div>
        <div className={`${styles.gridItem} ${styles.item5}`}>
          <img src="https://picsum.photos/317/317?random=5" alt="explore content 5" />
        </div>
      </div>

      {/* Нижній грід */}
      <div className={styles.grid}>
        {/* Велике зображення ліворуч */}
        <div className={`${styles.gridItem} ${styles.largeItem} ${styles.item6}`}>
          <img src="https://picsum.photos/317/638?random=6" alt="explore content 6" />
        </div>
        <div className={`${styles.gridItem} ${styles.item7}`}>
          <img src="https://picsum.photos/317/317?random=7" alt="explore content 7" />
        </div>
        <div className={`${styles.gridItem} ${styles.item8}`}>
          <img src="https://picsum.photos/317/317?random=8" alt="explore content 8" />
        </div>
        <div className={`${styles.gridItem} ${styles.item9}`}>
          <img src="https://picsum.photos/317/317?random=9" alt="explore content 9" />
        </div>
        <div className={`${styles.gridItem} ${styles.item10}`}>
          <img src="https://picsum.photos/317/317?random=10" alt="explore content 10" />
        </div>
      </div>
    </div>
  );
};

export default ExplorePanel;
