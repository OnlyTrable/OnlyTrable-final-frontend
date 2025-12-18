import React, { useState } from "react";
import styles from "./UserProfileContent.module.css";
import PostModal from "../PostModal/PostModal";
import { Link } from "react-router-dom";

const UserProfileContent = ({ isOwnProfile, userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!userData) return null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.avatarSection}>
          <img
            src={userData.avatar}
            alt={`${userData.username} avatar`}
            className={styles.avatar}
          />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.topRow}>
            <h2 className={styles.username}>{userData.username}</h2>

            {isOwnProfile ? (
              <div className={styles.actions}>
                <Link to="/editProfile">
                  <button className={styles.editBtn}>Edit profile</button>
                </Link>
              </div>
            ) : (
              <div className={styles.actions}>
                <div className={styles.actionsOther}>
                  <button className={styles.followBtn}>Follow</button>
                  <button className={styles.messageBtn}>Message</button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.stats}>
            <span>
              <strong>129</strong> posts
            </span>
            <span>
              <strong>9 993</strong> followers
            </span>
            <span>
              <strong>59</strong> following
            </span>
          </div>

          <div className={styles.bio}>
            <p className={styles.name}>{userData.fullName}</p>
            {/* Відображаємо "About" з MongoDB */}
            <p style={{ whiteSpace: "pre-line" }}>{userData.bio.about}</p>
            {/* Відображаємо "Website" */}
            {userData.bio.website && (
              <a
                href={
                  userData.bio.website.startsWith("http")
                    ? userData.bio.website
                    : `https://${userData.bio.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {userData.bio.website}
              </a>
            )}
          </div>
        </div>
      </header>

      <div className={styles.postsGrid}>
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <div
            key={id}
            className={styles.postBox}
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={`https://picsum.photos/404/506?random=${id}`}
              alt="post"
            />
          </div>
        ))}
      </div>

      <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default UserProfileContent;
