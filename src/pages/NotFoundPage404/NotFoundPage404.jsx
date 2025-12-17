import NotFoundContent from "../../components/NotFoundContent/NotFoundContent.jsx";
import styles from "./NotFoundPage404.module.css";

const NotFoundPage404 = () => {
  return (
    <div className={styles.container}>
      {/* 1. Content Area (Центральна область) - Займає весь доступний простір, відштовхуючи футер */}
      <div className={styles.contentArea}>
        <NotFoundContent />
      </div>

      {/* 2. Footer (внизу) */}
      <div className={styles.footer}>© 2024 ICHgram</div>
    </div>
  );
};

export default NotFoundPage404;