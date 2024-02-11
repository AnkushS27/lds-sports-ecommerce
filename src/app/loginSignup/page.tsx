"use client";
import React, { useState } from "react";
import styles from "./page.module.css";

export default function LoginSignup() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleSignupClick = () => {
    setShowLogin(false);
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.loginSignup}>
        <div className={styles.loginSignupContainer}>
          {showLogin ? (
            <>
              <h1>Login</h1>
              <div className={styles.loginSignupFields}>
                <input type="email" placeholder="Email Address" />
                <input type="password" placeholder="Password" />
              </div>
              <button>Login</button>
              <p className={styles.loginSignupLogin}>
                Don't have an account?&nbsp;
                <span onClick={handleSignupClick}>Sign Up</span>
              </p>
            </>
          ) : (
            <>
              <h1>Sign Up</h1>
              <div className={styles.loginSignupFields}>
                {/* Add signup form fields */}
                <input type="text" placeholder="Your Name" autoComplete="off" />
                <input type="email" placeholder="Email Address" />
                <input type="password" placeholder="Password" />
              </div>
              <button onClick={handleLoginClick}>Continue</button>
              <p className={styles.loginSignupLogin}>
                Already have an account?{" "}
                <span onClick={handleLoginClick}>Login</span>
              </p>
              <div className={styles.loginSignupAgree}>
                <input type="checkbox" name="" id="" />
                <p>
                  By continuing, I agree to the terms of use & privacy policy.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}