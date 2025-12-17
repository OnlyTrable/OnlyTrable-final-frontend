import React from "react";
import styles from "./PostModal.module.css";
import { X, Heart, MessageCircle, Smile } from "lucide-react";
import sashaAvatar from "../../assets/avatars/ich.png"; // Аватар автора

const PostModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* Кнопка закриття зовні вікна */}
      <button className={styles.closeBtn} onClick={onClose}>
        <X color="white" size={32} />
      </button>

      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ЛІВА ЧАСТИНА: Зображення (578x722) */}
        <div className={styles.imageSection}>
          <img
            src="https://picsum.photos/578/722"// Або {postImage}
            alt="Post content"
            className={styles.mainPostImage}
          />
        </div>

        {/* ПРАВА ЧАСТИНА: Деталі, коменти, активності */}
        <div className={styles.detailsSection}>
          {/* 1. Header: Автор, крапка, Follow */}
          <header className={styles.header}>
            <div className={styles.authorInfo}>
              <img src={sashaAvatar} alt="avatar" className={styles.avatar} />
              <span className={styles.username}>itcareerhub</span>
              <span className={styles.dot}>•</span>
              <button className={styles.followBtn}>Follow</button>
            </div>
          </header>

          {/* 2. Scrollable Area: Опис поста та коментарі */}
          <div className={styles.scrollContent}>
            {/* Опис поста (3 абзаци) */}
            <div className={styles.commentItem}>
              <img src={sashaAvatar} alt="avatar" className={styles.avatar} />
              <div className={styles.commentBody}>
                <span className={styles.username}>itcareerhub</span>
                <div className={styles.postText}>
                  <p>
                    Черногории! Проект по поддержке бездомных животных TailBook,
                    в разработке которого участвуют сразу 9 наших стажёров,
                    будет представлен на Web Summit 2024 в Португалии🔥
                  </p>
                  <p>
                    Мы поздравляем наших студентов, приглашаем вас на Web Summit
                    и предлагаем стать частью огромного сообщества крутых
                    специалистов, помогающих развивать и очищать нашу планету.
                  </p>
                  <p>
                    Занимайте место на бесплатной консультации по ссылке в шапке
                    профиля, чтобы узнать подробности!
                  </p>
                </div>
                <div className={styles.commentFooter}>
                  <span>1d</span>
                </div>
              </div>
            </div>

            {/* Коментар 1 */}
            <div className={styles.commentItem}>
              <div className={styles.placeholderAvatar}></div>
              <div className={styles.commentBody}>
                <span className={styles.username}>user_cool</span>
                <span className={styles.text}> 😍 спасибо!!!! 👏</span>
                <div className={styles.commentFooter}>
                  <span>2h</span>
                  <span className={styles.bold}>1 like</span>
                  <span>Reply</span>
                </div>
              </div>
              <Heart size={12} className={styles.commentHeart} />
            </div>

            {/* Коментар 2 */}
            <div className={styles.commentItem}>
              <div className={styles.placeholderAvatar}></div>
              <div className={styles.commentBody}>
                <span className={styles.username}>frontend_dev</span>
                <span className={styles.text}>
                  {" "}
                  Вау, это очень классно на самом деле!
                </span>
                <div className={styles.commentFooter}>
                  <span>1h</span>
                  <span>Reply</span>
                </div>
              </div>
              <Heart size={12} className={styles.commentHeart} />
            </div>
          </div>

          {/* 3. Footer: Лайки, дата, інпут */}
          <div className={styles.footer}>
            <div className={styles.actionIcons}>
              <Heart size={24} strokeWidth={2} />
              <MessageCircle size={24} strokeWidth={2} />
            </div>
            <div className={styles.likesCount}>1,432 likes</div>
            <div className={styles.postDate}>DECEMBER 14</div>

            <div className={styles.inputSection}>
              <Smile size={24} className={styles.smileIcon} />
              <input
                type="text"
                placeholder="Add a comment..."
                className={styles.commentInput}
              />
              <button className={styles.postBtn}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
