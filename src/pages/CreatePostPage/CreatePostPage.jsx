import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./CreatePostPage.module.css";
import { ImagePlus, X } from "lucide-react";

const CreatePostPage = () => {
  const { user, getAccessToken, isLoading } = useAuth(); // ✨ Отримуємо функцію для доступу до токена та isLoading
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // --- ✨ Клієнтська валідація файлу ---
    const MAX_SIZE_MB = 5;
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    if (selectedFile.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`File is too large. Maximum size is ${MAX_SIZE_MB}MB.`);
      return;
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      alert("Invalid file type. Please select a JPG, PNG, WEBP, or GIF image.");
      return;
    }
    // --- Кінець валідації ---

    setFile(selectedFile);
    // Створюємо нове прев'ю. Старе буде очищено в useEffect.
    setPreview(URL.createObjectURL(selectedFile));
  };

  // ✨ Очищуємо Object URL, щоб уникнути витоків пам'яті
  useEffect(() => {
    // Ця функція буде викликана, коли компонент демонтується
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleUpload = async () => {
    if (!file && !caption.trim()) {
      return alert("Post cannot be empty. Please add an image or a caption.");
    }
    setIsUploading(true);

    const formData = new FormData();
    // Додаємо поля, тільки якщо вони існують
    if (file) {
      formData.append("image", file);
    }
    if (caption.trim()) {
      formData.append("content", caption); // 🐛 ВИПРАВЛЕНО: бекенд очікує 'content'
    }

    try {
      // ✨ Тепер заголовок Authorization додається автоматично перехоплювачем
      await api.post("/posts", formData);
      // Перенаправляємо на головну сторінку після успішного створення
      navigate("/");
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // ✨ Функція для видалення зображення
  const handleRemoveImage = () => {
    // Очищуємо URL з пам'яті
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setFile(null); // 🐛 ВИПРАВЛЕНО: також очищуємо стан файлу
  };

  return (
    <div className={styles.appContainer}>
      <Sidebar activePage="Create" />
      <div className={styles.mainLayout}>
        <div className={styles.createBox}>
          <div className={styles.header}>
            <h3>Create new post</h3>
            {(preview || caption.trim()) && ( // Використовуємо trim() для перевірки caption
              <button onClick={handleUpload} className={styles.shareBtn} disabled={isUploading || isLoading}>
                {isUploading ? "Sharing..." : "Share"}
              </button>
            )}
          </div>

          <div className={styles.content}>
            {!preview ? (
              <div className={styles.uploadPlaceholder} onClick={() => fileInputRef.current.click()}>
                <ImagePlus size={48} />
                <p>Select photos and videos here</p>
                <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*" />
              </div>
            ) : (
              <div className={styles.editor}>
                <div className={styles.imagePreview}>
                  <img src={preview} alt="Preview" />
                  <button className={styles.removeBtn} onClick={handleRemoveImage}><X size={20}/></button>
                </div>
                <div className={styles.details}>
                  <div className={styles.userInfo}>
                    <img src={user?.avatarUrl} alt="avatar" className={styles.miniAvatar} />
                    <span>{user?.username}</span>
                  </div>
                  <textarea 
                    placeholder="Write a caption..." 
                    value={caption} 
                    onChange={(e) => setCaption(e.target.value)}
                    maxLength="2200"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;