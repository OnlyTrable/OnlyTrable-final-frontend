import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./MainPage.module.css";
const MainPage = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <Sidebar className={styles.Sidebar} />
      <Footer />
    </div>
  );
};
export default MainPage;
