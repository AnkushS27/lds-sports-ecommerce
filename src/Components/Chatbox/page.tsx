import styles from "./page.module.css";

export default function Chatbox() {
  return (
    <div className={styles.chatBoxContainer}>
      <div className={styles.userImageContainer}>
        <div className={styles.userImage}></div>
      </div>
      <div className={styles.inputContainer}>
        <input type="text" placeholder="Type a comment" />
        <button>Post</button>
      </div>
    </div>
  );
}
