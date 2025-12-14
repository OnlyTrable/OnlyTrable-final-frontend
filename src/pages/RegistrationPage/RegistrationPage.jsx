import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/auth.yup";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPage.module.css";
import Input from "../../components/Input/Input.jsx";
import Button from '../../components/Button/Button.jsx';
import logo from "../../assets/icons/logo.svg";
import api from '../../api/axios.js';
import useNotification from '../../hooks/useNotification'; // 1. Імпорт хука
import NotificationModal from '../../components/NotificationModal/NotificationModal.jsx'; // 2. Імпорт компонента
const RegistrationPage = () => {
  const navigate = useNavigate();
  const { notification, showNotification, closeNotification } = useNotification();
  const {
    register,
    handleSubmit,
    // Додаємо isSubmitting для керування станом кнопки та setError для обробки помилок
    formState: { errors, isSubmitting }, 
    setError, 
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const handleCloseAndRedirect = useCallback(() => {
      closeNotification();
      // 7. Перенаправляємо, коли користувач натиснув OK, І ТІЛЬКИ ЯКЩО БУВ УСПІХ
      if (notification.type === 'success') {
          navigate('/'); 
      }
  }, [notification.type, closeNotification, navigate]);
  // 3. Асинхронна функція для відправки даних
  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/register', {
        email: data.email,
        fullName: data.fullName,
        username: data.username,
        password: data.password,
      });
      console.log("Axios Response Received:", response);
      console.log("Response Status:", response.status);
      // 2. Обробляємо успішну реєстрацію (статус 2xx, але без токена)
      if (response.status === 201 || response.status === 200) {
        showNotification("Registration successful! You can now log in.", "success");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        
        // 6. Обробка помилок
        if (status === 409) { // 409 Conflict - це ймовірно "Resource Conflict"
            const message = error.response.data.message || "Username or email is already taken.";
            showNotification(`Registration failed: ${message}`, "error");
            
            // Якщо бекенд повертає 409 і ви знаєте, яке поле, використовуйте setError:
            setError("username", { type: "manual", message: "Taken." });
        } else {
            const message = error.response.data.message || "An unexpected error occurred.";
            showNotification(`Registration failed: ${message}`, "error");
        }
      } else {
        showNotification("Cannot connect to the server. Please check your network.", "error");
      }
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h3 className={styles.subtitle}>
          Sign up to see photos and videos from your friends.
        </h3>

        {/* Поля вводу */}
        <Input
          {...register("email")}
          type="email"
          error={errors.email?.message}
          placeholder="Email"
          className={styles.formInput}
        />
        <Input
          {...register("fullName")}
          error={errors.fullName?.message}
          placeholder="Full Name"
          className={styles.formInput}
        />
        <Input
          {...register("username")}
          error={errors.username?.message}
          placeholder="Username"
          className={styles.formInput}
        />
        <Input
          {...register("password")}
          type="password"
          error={errors.password?.message}
          placeholder="Password"
          className={styles.formInput}
        />
        
        {/* Блок strings1 */}
        <div className={styles.strings1}>
          <p className={styles.parag}>
            People who use our service may have uploaded
          </p>
          <div className={styles.contactRow}>
            <p className={styles.contactParag}>
              your contact information to Ichgram.
            </p>
            <a className={styles.learnMore} href="#">
              Learn More
            </a>
          </div>
        </div>

        <div className={styles.strings2}>
          <p className={styles.parag}>
            By signing up, you agree to our 
            <wbr />
            <a className={styles.learnMore} href="/terms">
              Terms,
            </a>
            <a className={styles.learnMore} href="/privacy">
              Privacy
              <wbr /> Policy
            </a>
            <span className={styles.and}>and</span>
            <a className={styles.learnMore} href="/cookies">
              Cookies Policy.
            </a>
          </p>
        </div>
        <Button 
          // 6. Керування станом кнопки
          text={isSubmitting ? "Signing Up..." : "Sign Up"} 
          type="submit" 
          disabled={isSubmitting} // Вимикаємо кнопку під час очікування відповіді
        />
      </form>
      <div className={styles.strings3}>
        <div className={styles.contactRow}>
            <p className={styles.contactParag}>
              Have an account?
            </p>
            &nbsp;
            <a className={styles.learnMore} href="/">
              Log in
            </a>
          </div>
      </div>
      {/* Додаємо модальне вікно */}
      <NotificationModal
        isOpen={notification.isOpen}
        message={notification.message}
        type={notification.type}
        onClose={handleCloseAndRedirect} // Використовуємо виправлену функцію
      />
    </div>
  );
};

export default RegistrationPage;