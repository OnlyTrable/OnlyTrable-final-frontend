import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import NotFoundContent from "../../components/NotFoundContent/NotFoundContent.jsx"
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.appContainer}> {/* Головний контейнер: Grid */}
      
      {/* 1. SideBar (ліва колонка) - Тепер у потоці документа */}
      <Sidebar />
      
      <div className={styles.mainLayout}> {/* Права колонка: Flexbox (contentArea + Footer) */}
        
        {/* 2. Content Area (Центральна область) - Займає весь доступний простір, відштовхуючи футер */}
        <div className={styles.contentArea}>
            <NotFoundContent />
        </div>
        
        {/* 3. Footer (внизу) */}
        <Footer />
      </div>
    </div>
  );
};

export default NotFoundPage