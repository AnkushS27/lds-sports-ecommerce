"use client";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
// import { getCsrfToken } from "next-auth/react";

export default function LoginSignup() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  const onSignup = async () => {
    try {
      const response = await fetch("/api/user/signup",{
        method : 'POST',
        headers : {'Content-Type' : 'application/json',},
        body : JSON.stringify(user),
      });
      console.log("Login success", await response.json());
      
      const { email, password } = user;
      try {
        signIn('credentials', {
          email,  password,
          callbackUrl: '/',
          redirect: true,
        });
      } catch (error: any) {
        console.log('Login Failed', error.message);
      }
    } catch (error: any) {
      console.log("Login failed", error.message);
    }
  };

  // const csrfToken = await getCsrfToken;
  // console.log(csrfToken);
  // const handleLoginClick = async () => {
  // console.log(csrfToken);
  // const resp = await fetch('api/register',{
  //   method : 'POST',
  //   headers: {'Content-Type' : 'application/json',},
  //   body : JSON.stringify({
  //     uname, email, password, getCsrfToken,
  //   }),
  // })
  // console.log(await resp.json());

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.loginSignup}>
        <div className={styles.loginSignupContainer}>
          <h1>Sign Up</h1>
          <div className={styles.loginSignupFields}>
            {/* Add signup form fields */}
            <input
              type="text"
              placeholder="Your Name"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <div className={styles.passwordCotainer}>
              <input
                type={showPass ? "text" : "password"}
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
                style={{ paddingRight: "70px" }}
              />
              <div
                className={styles.passwordShowBtn}
                onClick={() => {
                  setShowPass(!showPass);
                }}
              >
                {showPass ? "hide" : "show"}
              </div>
            </div>
          </div>
          <button onClick={onSignup} disabled={!user.username || !user.email || !user.password}>Continue</button>
          <p className={styles.loginSignupLogin}>
            Already have an account? <Link href="/login" className={styles.changePage}>Login</Link>
          </p>
          <div className={styles.loginSignupAgree}>
            <input
              type="checkbox"
              name=""
              id=""
              style={{
                width: "25px",
                height: "25px",
                background: "white",
                color: "black",
                borderRadius: "10px",
              }}
            />
            <p>
              By continuing, I agree to the <Link href="#">terms</Link> of use &{" "}
              <Link href="#">privacy ploicy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
