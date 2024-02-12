"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function LoginSignup() {
  const [uname, setUname] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass,setShowPass] = useState(false);
  const handleLoginClick = () => {
    console.log('Login Request');
  }
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.loginSignup}>
        <div className={styles.loginSignupContainer}>
              <h1>Sign Up</h1>
              <div className={styles.loginSignupFields}>
                {/* Add signup form fields */}
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Email Address" />
                <div className={styles.passwordCotainer}>
                  <input type={showPass ? "text" : "password"} placeholder="Password" style={{paddingRight:'70px'}} />
                  <div className={styles.passwordShowBtn} onClick={() => {setShowPass(!showPass)}}>{showPass ? "hide" : "show"}</div>
                </div>
              </div>
              <button onClick={handleLoginClick}>Continue</button>
              <p className={styles.loginSignupLogin}>
                Already have an account?{" "}
                <Link href='/login'>Login</Link>
              </p>
              <div className={styles.loginSignupAgree}>
                <input type="checkbox" name="" id="" style={{width:'30px',height:'30px',background:'white',color:'black',borderRadius:'10px'}} />
                <p>
                  By continuing, I agree to the <Link href='#'>terms</Link> of use & <Link href='#'>privacy ploicy</Link>
                </p>
              </div>
        </div>
      </div>
    </div>
  );
}
