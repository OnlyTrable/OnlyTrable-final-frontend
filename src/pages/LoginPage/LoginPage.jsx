import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom"; // ✅ Додаємо для перенаправлення
import { loginSchema } from "../../schemas/auth.yup";
import { useAuth } from '../../context/AuthContext';
import styles from "./LoginPage.module.css";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import logo from "../../assets/icons/logo.svg";
import api from '../../api/axios.js'; // ✅ Імпорт інстансу Axios
import useNotification from '../../hooks/useNotification'; // ✅ Імпорт хука
import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx'; // ✅ Імпорт компонента
import phoneImages from "../../assets/images/ichgram.png";


const LoginPage = () => {
  const navigate = useNavigate();
  const { notification, showNotification, closeNotification } = useNotification();
  const { login, isAuthenticated } = useAuth(); // 👈 Отримуємо функцію login
    
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // Функція для перенаправлення після закриття модального вікна
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/main', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  // Асинхронна функція для відправки даних логіну
  const onSubmit = async (data) => {
    try {
      // 1. Надсилаємо запит на бекенд
      const response = await api.post('/auth/login', {
        // Використовуємо 'loginId', як визначено у формі
        loginId: data.loginId, 
        password: data.password,
      });

      // 👇 Деструктуризуємо і токен, і користувача з відповіді
      const { token, user } = response.data;

      if (token && user) {
        // 2. Зберігаємо токен та показуємо успіх
        login(token, user); // ✅ Передаємо обидва значення в контекст
        showNotification("Login successful! Welcome to Ichgram.", "success");
      } else {
         // Якщо немає токена, але запит 200/201 (дуже малоймовірно, але безпечно)
         showNotification("Login succeeded, but failed to receive a token.", "error");
      }
    } catch (error) {
      // 3. Обробка помилок
      if (error.response) {
        const status = error.response.status;
        const message = error.response?.data?.message || "Invalid username or password.";
        showNotification(message, "error");
        // 401 Unauthorized або 400 Bad Request
        if (status === 401 || status === 400) { 
            showNotification(`Login failed: ${message}`, "error");
        } else {
            showNotification(`An unexpected server error occurred: ${message}`, "error");
        }
      } else {
        // Помилки мережі
        showNotification("Cannot connect to the server. Please check your network.", "error");
      }
    }
  };
  if (isAuthenticated) return null;
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.imageContainer}>
        <img
          src={phoneImages}
          alt="Mobile phones displaying a social media feed"
          className={styles.phoneImages}
        />
      </div>

      <div className={styles.rightColumn}>
        {/* Основний контейнер форми */}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <img src={logo} alt="ICHGRAM logo" className={styles.logo} />

          <Input
            {...register("loginId")}
            type="text"
            error={errors.loginId?.message}
            placeholder="Username, or email"
            className={styles.formInput}
          />
          <Input
            {...register("password")}
            type="password"
            error={errors.password?.message}
            placeholder="Password"
            className={styles.formInput}
          />

          <Button 
            text={isSubmitting ? "Logging In..." : "Log In"} 
            type="submit"
            disabled={isSubmitting} // ✅ Використовуємо для вимкнення кнопки
          />

          {/* OR divider */}
          <div className={styles.divider}>
            <div className={styles.line}></div>
            <span className={styles.orText}>OR</span>
            <div className={styles.line}></div>
          </div>

          {/* Forgot password link */}
          <a href="/reset" className={styles.forgotPasswordLink}>
            Forgot password?
          </a>
        </form>

        {/* Контейнер "Don't have an account? Sign up" */}
        <div className={styles.signUpContainer}>
          <p className={styles.signUpText}>
            Don't have an account? &nbsp;
            <a href="/registration" className={styles.signUpLink}>
              Sign up
            </a>
          </p>
        </div>
      </div>
      
      {/* ✅ ДОДАЄМО МОДАЛЬНЕ ВІКНО */}
      <NotificationModal
        isOpen={notification.isOpen}
        message={notification.message}
        type={notification.type}
        onClose={closeNotification} // Використовуємо функцію з перенаправленням
      />
    </div>
  );
};

export default LoginPage;