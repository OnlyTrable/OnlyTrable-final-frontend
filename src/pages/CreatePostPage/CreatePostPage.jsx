import React, { useState, useRef } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./CreatePostPage.module.css";
import { ImagePlus, X } from "lucide-react";

const CreatePostPage = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Post created successfully!");
      // Тут можна редиректнути на профіль
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div className={styles.appContainer}>
      <Sidebar activePage="Create" />
      <div className={styles.mainLayout}>
        <div className={styles.createBox}>
          <div className={styles.header}>
            <h3>Create new post</h3>
            {preview && <button onClick={handleUpload} className={styles.shareBtn}>Share</button>}
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
                  <button className={styles.removeBtn} onClick={() => setPreview(null)}><X size={20}/></button>
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