"use client";
import { useState } from "react";
import Comment from "../Comment/page";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";

let prevValues = [
  {content: "This is a sample comment.", authorId: "user1234", createdDate: "2024-02-23T17:12:26.474Z"},
  {content: "This is a sample comment.", authorId: "user1234", createdDate: "2024-02-23T17:12:26.474Z"},
  {content: "This is a sample comment.", authorId: "user1234", createdDate: "2024-02-23T17:12:26.474Z"},
  {content: "This is a sample comment.", authorId: "user1234", createdDate: "2024-02-23T17:12:26.474Z"},
]

export default function Chatbox() {
  const sendComment = () => {
    let cmt = {
      content: comment,
      authorId: session && session.user?.id ? session.user?.id : 'auth123',
      createdDate: new Date().toISOString()
    };
    // Send the comment to server.
    console.log(cmt);
  
    // Update prevComments by adding the new comment to the existing comments array
    setPrevComments((prevCmts) => [cmt, ...prevCmts]);
  
    // Clear the comment.
    setComment('');
  }  
  
  const [comment,setComment] = useState('');
  const [prevComments, setPrevComments] = useState(prevValues);
  const { data: session } = useSession();
  return (
    <div className={styles.chatBoxContainer}>
      <div className={styles.inputContainer}>
        <input type="text" placeholder="Type a comment"
        onChange={(e) => {setComment(e.target.value)}} />
        <button onClick={() => {sendComment()}}>Post</button>
      </div>
      <div className={styles.productCommentsWrapper}>
      {prevComments.map((cmt,idx) => {
        return(
          <div className={styles.productCommentsContainer} key={idx}>
            <Comment content={cmt.content} authorId={cmt.authorId}  createdDate={cmt.createdDate} />
          </div>
        )
      })}
      </div>
    </div>
  );
}
