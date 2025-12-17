import React from 'react';
import styles from './PostViewModal.module.css';
import { X, Heart, MessageCircle, Smile } from 'lucide-react';

const PostViewModal = ({ isOpen, onClose, postData }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <button className={styles.closeMain} onClick={onClose}><X color="white" size={30} /></button>
      
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Ліва частина: Зображення */}
        <div className={styles.imageSection}>
          <div className={styles.imagePlaceholder}>
            {/* Тут буде зображення поста (578x722) */}
          </div>
        </div>

        {/* Права частина: Інфо та коментарі */}
        <div className={styles.detailsSection}>
          
          {/* Header: Аватар, Username, Follow */}
          <header className={styles.header}>
            <div className={styles.userInfo}>
              <div className={styles.smallAvatar}></div>
              <span className={styles.username}>itcareerhub</span>
              <span className={styles.dot}>•</span>
              <button className={styles.followBtn}>Follow</button>
            </div>
            <button className={styles.moreOptions}>•••</button>
          </header>

          <div className={styles.scrollableArea}>
            {/* Опис самого поста */}
            <div className={styles.commentItem}>
              <div className={styles.smallAvatar}></div>
              <div className={styles.commentContent}>
                <span className={styles.username}>itcareerhub</span>
                <div className={styles.postText}>
                  <p>Черногории! Проект по поддержке бездомных животных TailBook, в разработке которого участвуют сразу 9 наших стажёров, будет представлен на Web Summit 2024 в Португалии🔥</p>
                  <p>Мы поздравляем наших студентов, приглашаем вас на Web Summit и предлагаем стать частью огромного сообщества крутых специалистов, помогающих развивать и очищать нашу планету.</p>
                  <p>Занимайте место на бесплатной консультации по ссылке в шапке профиля, чтобы узнать подробности!</p>
                </div>
                <span className={styles.timeAgo}>1d</span>
              </div>
            </div>

            {/* Коментар 1 */}
            <div className={styles.commentItem}>
              <div className={styles.smallAvatar}></div>
              <div className={styles.commentContent}>
                <span className={styles.username}>user_1</span>
                <span className={styles.text}> 😍 спасибо!!!! 👏</span>
                <div className={styles.commentMetrics}>
                  <span>2h</span>
                  <span className={styles.bold}>1 like</span>
                  <span>Reply</span>
                </div>
              </div>
              <Heart size={12} className={styles.heartIcon} />
            </div>

            {/* Коментар 2 */}
            <div className={styles.commentItem}>
              <div className={styles.smallAvatar}></div>
              <div className={styles.commentContent}>
                <span className={styles.username}>user_2</span>
                <span className={styles.text}> Вау, это очень классно на самом деле!</span>
                <div className={styles.commentMetrics}>
                  <span>1h</span>
                  <span>Reply</span>
                </div>
              </div>
              <Heart size={12} className={styles.heartIcon} />
            </div>
          </div>

          {/* Нижня частина: Лайки та Інпут */}
          <div className={styles.footerSection}>
            <div className={styles.actions}>
              <Heart size={24} />
              <MessageCircle size={24} />
            </div>
            <div className={styles.likesCount}>1,234 likes</div>
            <div className={styles.timestamp}>DECEMBER 14, 2025</div>
            
            <div className={styles.commentInputWrapper}>
              <Smile size={24} className={styles.emojiIcon} />
              <input type="text" placeholder="Add a comment..." className={styles.input} />
              <button className={styles.sendBtn}>Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostViewModal;