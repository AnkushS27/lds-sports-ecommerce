"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { commentType } from "@/TypeInterfaces/TypeInterfaces";
import Chatbox from "@/Components/Chatbox/page";

import { AiFillLike, AiOutlineLike } from "react-icons/ai";

export default function Comment(props: commentType) {
  const [showReplies, setShowReplies] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setliked] = useState(false);
  const [replyCount, setReplyCount] = useState(5);

  const updateLike = () => {
    if (liked) {setLikeCount(likeCount-1); setliked(false);}
    else {setLikeCount(likeCount+1); setliked(true);}

    // Send the update request to backend.
    console.log(likeCount);
  }
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
            <button onClick={() => {updateLike()}}>
              {liked? <AiFillLike className={styles.likeButton} />: <AiOutlineLike className={styles.likeButton} />}{likeCount}
            </button>
            <button onClick={() => {setShowReplies(!showReplies)}}>{replyCount} replies</button>
          </div>
          {showReplies && <Chatbox />}
          {/* <div className={styles.repliesContainer}>
            <button className={styles.repliesDropdown} >
              🔻 2 replies
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
