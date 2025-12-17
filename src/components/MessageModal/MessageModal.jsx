import React from 'react';
import styles from './MessageModal.module.css';
import { X } from 'lucide-react'; // Іконка закриття

const MessageModal = ({ isOpen, onClose, username }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>New message</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className={styles.recipientArea}>
          <span>To: <strong>{username}</strong></span>
        </div>

        <div className={styles.messageBody}>
          <textarea 
            placeholder="Write a message..." 
            className={styles.messageInput}
          ></textarea>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.sendBtn}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;