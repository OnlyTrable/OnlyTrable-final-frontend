import React, { useState, useRef } from "react";
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { ImagePlus, X } from "lucide-react";
import Button from "../Button/Button.jsx";
import styles from "./CreatePostModal.module.css";
import useNotification from "../../hooks/useNotification.js";

const CreatePostModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [content, setContent] = useState(""); // Змінено з caption на content
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const clearForm = () => {
    setFile(null);
    setPreview(null);
    setContent("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  const handleUpload = async () => {
    // 1. Дозволяємо відправку, якщо є або текст, або файл
    if (!file && !content.trim()) {
      alert("Please add an image or write a caption."); // Можна замінити на кращий нотифікатор
      return;
    }

    const formData = new FormData();

    // 2. Умовно додаємо дані
    if (file) {
      formData.append("image", file);
    }
    if (content.trim()) {
      // 3. Використовуємо 'content' замість 'caption'
      formData.append("content", content);
    }

    try {
      // Явно вказуємо заголовок для надійності при відправці файлів
      await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      handleClose();
      window.location.reload(); // Тимчасове рішення для оновлення стрічки
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <button onClick={handleClose} className={styles.closeBtn}><X size={24} /></button>
          <h3>Create new post</h3>
          <Button
            text="Share"
            onClick={handleUpload}
            disabled={!preview && !content.trim()} // Кнопка активна, якщо є або текст, або зображення
            className={styles.shareBtn}
            type="submit"
          />
        </header>

        <div className={styles.uploadArea}>
            <div className={styles.imageBox}>
              {!preview ? (
                <div className={styles.uploadArea} onClick={() => fileInputRef.current.click()}>
                  <ImagePlus size={154} strokeWidth={1} />
                  <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*" />
                </div>
              ) : (
                <img src={preview} alt="Preview" className={styles.mainPostImage} />
              )}
            </div>
            <div className={styles.detailsSection}>
              <div className={styles.user}>
                <img src={user?.avatarUrl || user?.avatar} className={styles.avatar} alt="avatar" />
                <span className={styles.username}>{user?.username }</span>
              </div>
              <textarea className={styles.textarea}
                placeholder="Write a caption..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;