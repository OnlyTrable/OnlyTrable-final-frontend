import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./EditProfilePanel.module.css";
import Input from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";
import { Link } from "lucide-react"; // Іконка для поля Website
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";
import useNotification from "../../hooks/useNotification.js";
import NotificationModal from "../NotificationModal/NotificationModal.jsx";

const MAX_ABOUT_LENGTH = 150;

const EditProfilePanel = ({ user }) => {
  const { setUser } = useAuth();
  const { notification, showNotification, closeNotification } =
    useNotification();
  const fileInputRef = useRef(null); // Створюємо ref для доступу до input
  const [about, setAbout] = useState(user?.about || "");
  const { register, handleSubmit, setValue } = useForm();

  const handleAboutChange = (e) => {
    if (e.target.value.length <= MAX_ABOUT_LENGTH) {
      setAbout(e.target.value);
    }
  };

  // Встановлюємо початкові значення для react-hook-form
  useEffect(() => {
    setValue("username", user.username);
    setValue("website", user.website);
    setValue("about", user.about);
  }, [user, setValue]);

  // Функція, що викликається при кліку на кнопку "New photo"
  const handleNewPhotoClick = (e) => {
    e.preventDefault(); // Запобігаємо відправці форми
    fileInputRef.current.click(); // Програмно клікаємо на прихований input
  };

  // Функція, що викликається після вибору файлу
  const handleFileSelected = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      // Відправляємо файл на сервер
      const response = await api.patch("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Оновлюємо дані користувача (включаючи новий avatarUrl)
      setUser(response.data.user);
      showNotification("Avatar updated successfully!", "success");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to upload avatar.";
      showNotification(errorMessage, "error");
    }
  };

  // Функція для відправки даних форми
  const onSubmit = async (data) => {
    try {
      const response = await api.patch("/user/profile", data);
      setUser(response.data.user); // Оновлюємо дані користувача в контексті
      showNotification("Profile updated successfully!", "success");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update profile.";
      showNotification(errorMessage, "error");
    }
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className={styles.panelWrapper}>
      <h2 className={styles.title}>Edit profile</h2>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* --- Секція аватара --- */}
        <div className={styles.avatarSection}>
          <img
            src={user.avatarUrl}
            alt="User avatar"
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <span className={styles.username}>{user.username}</span>
            <span className={styles.aboutPreview}>
              {user.about.split("\n")[0]}
            </span>
          </div>

            <Button text="New photo" onClick={handleNewPhotoClick} />
        </div>

        {/* Прихований input для вибору файлу */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*" // Дозволяємо вибирати тільки зображення
          onChange={handleFileSelected}
        />

        {/* --- Секція Username --- */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Username</label>
          <Input {...register("username")} />
        </div>

        {/* --- Секція Website --- */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Website</label>
          <div className={styles.inputWithIcon}>
            <Link className={styles.icon} size={20} />
            <Input {...register("website")} placeholder="Website" />
          </div>
        </div>

        {/* --- Секція About --- */}
        <div className={styles.formGroup}>
          <label className={styles.label}>About</label>
          <div className={styles.textareaWrapper}>
            <textarea
              className={styles.textarea}
              {...register("about")}
              onChange={(e) => {
                register("about").onChange(e); // Для react-hook-form
                handleAboutChange(e); // Для лічильника
              }}
            />
            <span className={styles.charCounter}>
              {about.length}/{MAX_ABOUT_LENGTH}
            </span>
          </div>
        </div>

        {/* --- Кнопка збереження --- */}
        <div className={styles.submitButtonWrapper}>
          <Button text="Save" type="submit" />
        </div>
      </form>

      <NotificationModal
        isOpen={notification.isOpen}
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />
    </div>
  );
};

export default EditProfilePanel;
