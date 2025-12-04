import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.navLinks}>
        <li className={styles.linkItem}>
          <a href="/main" className={styles.link}>Home</a>
        </li>
        <li className={styles.linkItem}>
          <a href="#" className={styles.link}>Search</a>
        </li>
        <li className={styles.linkItem}>
          <a href="/interest" className={styles.link}>Explore</a>
        </li>
        <li className={styles.linkItem}>
          <a href="/messages" className={styles.link}>Messages</a>
        </li>
        <li className={styles.linkItem}>
          <a href="#" className={styles.link}>Notifications</a>
        </li>
        <li className={styles.linkItem}>
          <a href="#" className={styles.link}>Create</a>
        </li>
      </ul>
      <p className={styles.copyright}>
        © 2025 ICHgram
      </p>
    </footer>
  );
};

export default Footer;