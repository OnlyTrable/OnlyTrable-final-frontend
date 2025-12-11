import React, { useState } from 'react';
import styles from './MessagesPanel.module.css';
import EditIcon from '../../assets/icons/create.svg';
import Input from '../Input/Input.jsx'; // 👈 Імпортуємо Input
import Button from '../Button/Button.jsx'; // 👈 Імпортуємо Button

// Мокові дані для діалогів
const mockConversations = [
    { id: 1, user: 'john.doe', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Hey, how are you?', time: '10m', unread: 2 },
    { id: 2, user: 'jane.smith', avatar: 'https://i.pravatar.cc/150?img=2', lastMessage: 'See you tomorrow!', time: '1h', unread: 0 },
    { id: 3, user: 'user_one', avatar: 'https://i.pravatar.cc/150?img=5', lastMessage: 'Okay, sounds good.', time: '3h', unread: 0 },
];

// Мокові дані для повідомлень у вибраному чаті
const mockMessages = {
    1: [
        { id: 1, text: 'Hi there!', sender: 'other' },
        { id: 2, text: 'Hey, how are you?', sender: 'other' },
        { id: 3, text: 'I am good, thanks! And you?', sender: 'me' },
    ],
    2: [
        { id: 1, text: 'See you tomorrow!', sender: 'other' },
    ],
    3: [
        { id: 1, text: 'Okay, sounds good.', sender: 'other' },
    ]
};

const MessagesPanel = () => {
    const [selectedConversationId, setSelectedConversationId] = useState(mockConversations[0].id);

    const selectedConversation = mockConversations.find(c => c.id === selectedConversationId);
    const messages = mockMessages[selectedConversationId] || [];

    return (
        <div className={styles.messagesPanelWrapper}>
            {/* Ліва панель: Список діалогів */}
            <div className={styles.conversationsPanel}>
                <div className={styles.panelHeader}>
                    <h2>Messages</h2>
                    <button className={styles.newMessageButton}>
                        <img src={EditIcon} alt="New Message" />
                    </button>
                </div>
                <div className={styles.conversationsList}>
                    {mockConversations.map(convo => (
                        <div
                            key={convo.id}
                            className={`${styles.conversationItem} ${convo.id === selectedConversationId ? styles.active : ''}`}
                            onClick={() => setSelectedConversationId(convo.id)}
                        >
                            <img src={convo.avatar} alt={convo.user} className={styles.avatar} />
                            <div className={styles.conversationDetails}>
                                <span className={styles.username}>{convo.user}</span>
                                <span className={styles.lastMessage}>
                                    {convo.lastMessage} · {convo.time}
                                </span>
                            </div>
                            {convo.unread > 0 && <div className={styles.unreadIndicator}></div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Права панель: Вікно чату */}
            <div className={styles.chatPanel}>
                {selectedConversation ? (
                    <>
                        <div className={styles.chatHeader}>
                            <img src={selectedConversation.avatar} alt={selectedConversation.user} className={styles.avatar} />
                            <span className={styles.username}>{selectedConversation.user}</span>
                        </div>
                        <div className={styles.messagesContainer}>
                            {messages.map(msg => (
                                <div key={msg.id} className={`${styles.message} ${msg.sender === 'me' ? styles.myMessage : styles.theirMessage}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className={styles.messageInputWrapper}>
                            {/* 👇 Використовуємо кастомні компоненти */}
                            <Input 
                                placeholder="Message..." 
                                className={styles.messageInput} // Передаємо клас для внутрішнього input
                            />
                            <Button text="Send" />
                        </div>
                    </>
                ) : (
                    <div className={styles.noChatSelected}>
                        <h2>Select a chat to start messaging</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagesPanel;