"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { commentType } from "@/TypeInterfaces/TypeInterfaces";
import Chatbox from "@/Components/Chatbox/page";

import { AiOutlineLike } from "react-icons/ai";

export default function Comment(props: commentType) {
  const [showChatbox, setShowChatbox] = useState(false);
  const [replyButtonText, setReplyButtonText] = useState('Reply');

  const handleReplyClick = () => {
    setShowChatbox(!showChatbox);
    setReplyButtonText(showChatbox ? 'Reply' : 'Cancel');
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentBox}>
        <div className={styles.userImageContainer}>
            <div className={styles.userImage}></div>
        </div>
        <div className={styles.commentDetails}>
          <p>
            <span>{props.authorId}</span>
            <span>{props.createdDate}</span>
          </p>
          <p>{props.content}</p>
          <div className={styles.buttonsContainer}>
            <button><AiOutlineLike className={styles.likeButton}/>1</button>
            <button onClick={handleReplyClick}>{replyButtonText}</button>
          </div>
          {showChatbox && <Chatbox />}
          <div className={styles.repliesContainer}>
            <button className={styles.repliesDropdown}>
              🔻 2 replies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
