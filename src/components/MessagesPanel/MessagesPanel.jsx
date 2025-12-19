import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./MessagesPanel.module.css";
import EditIcon from "../../assets/icons/create.svg";
import Input from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";

const formatTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  return `${Math.floor(diffInSeconds / 86400)}d`;
};

const MessagesPanel = ({ activeConversationId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    api.get("/messages/conversations")
      .then((res) => setConversations(res.data.conversations || []))
      .catch((err) => {});
  }, [activeConversationId]);

  useEffect(() => {
    if (activeConversationId) {
      api.get(`/messages/${activeConversationId}`)
        .then((res) => setMessages(res.data.messages || []))
        .catch((err) => {});
    } else {
      setMessages([]);
    }
  }, [activeConversationId]);

  useEffect(() => {
    const s = io("http://localhost:3000", {
      withCredentials: true,
      transports: ["polling", "websocket"],
    });
    socketRef.current = s;

    s.on("connect", () => {
      if (activeConversationId) {
        s.emit("join_conversation", activeConversationId);
      }
    });

    s.on("new_message", (msg) => {
      setMessages((prev) => {
        const isDuplicate = prev.some((m) => 
          m._id === msg._id || 
          (m.content === msg.content && m.sender._id === user._id && m._id.startsWith("temp-"))
        );

        if (isDuplicate) {
          return prev.map(m => 
            (m.content === msg.content && m.sender._id === user._id && m._id.startsWith("temp-")) 
            ? msg : m
          );
        }

        if (msg.conversation === activeConversationId) {
          return [...prev, msg];
        }
        return prev;
      });

      setConversations((prev) =>
        prev.map((c) =>
          c._id === msg.conversation ? { ...c, lastMessage: msg } : c
        )
      );
    });

    return () => {
      s.disconnect();
      socketRef.current = null;
    };
  }, [activeConversationId, user._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || !activeConversationId) return;

    const activeConvo = conversations.find((c) => c._id === activeConversationId);
    const recipientId = activeConvo?.otherParticipant?._id;

    const tempMsg = {
      _id: `temp-${Date.now()}`,
      content: newMessage,
      sender: { _id: user._id, username: user.username },
      createdAt: new Date().toISOString(),
      conversation: activeConversationId
    };

    setMessages((prev) => [...prev, tempMsg]);
    const textToSend = newMessage;
    setNewMessage("");

    try {
      await api.post("/messages", { recipientId, content: textToSend });
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
    }
  };

  const activeConvo = conversations.find((c) => c._id === activeConversationId);

  return (
    <div className={styles.messagesPanelWrapper}>
      <div className={styles.conversationsPanel}>
        <div className={styles.panelHeader}>
          <h2>Messages</h2>
          <button className={styles.newMessageButton}><img src={EditIcon} alt="New" /></button>
        </div>
        <div className={styles.conversationsList}>
          {conversations.map((convo) => (
            <div
              key={convo._id}
              className={`${styles.conversationItem} ${convo._id === activeConversationId ? styles.active : ""}`}
              onClick={() => navigate(`/direct/t/${convo._id}`)}
            >
              <img src={convo.otherParticipant?.avatarUrl || "https://i.pravatar.cc/150"} className={styles.avatar} alt="avatar" />
              <div className={styles.conversationDetails}>
                <span className={styles.username}>{convo.otherParticipant?.username}</span>
                <span className={styles.lastMessage}>
                  {convo.lastMessage?.content || "No messages"} · {formatTime(convo.lastMessage?.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.chatPanel}>
        {activeConversationId ? (
          <>
            <div className={styles.chatHeader}>
              <img src={activeConvo?.otherParticipant?.avatarUrl || "https://i.pravatar.cc/150"} className={styles.avatar} alt="avatar" />
              <span className={styles.username}>{activeConvo?.otherParticipant?.username}</span>
            </div>
            <div className={styles.messagesContainer}>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`${styles.message} ${msg.sender._id === user._id ? styles.myMessage : styles.theirMessage}`}
                >
                  {msg.content}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form className={styles.messageInputWrapper} onSubmit={handleSendMessage}>
              <Input
                placeholder="Message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className={styles.messageInput}
              />
              <Button text="Send" onClick={handleSendMessage} disabled={!newMessage.trim()} />
            </form>
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