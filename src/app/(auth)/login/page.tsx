"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";


export default function LoginSignup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  const onLogin = async () => {
    // try {
    //   signIn('credentials', {
    //     user,
    //     callbackUrl: '/',
    //     redirect: true,
    //   });
    // } catch (error: any) {
    //   console.log('Login Failed', error.message);
    // }
    try {
      const resp =  (await axios.post('/api/user/login',user)).data;
      console.log(resp)
      if (resp.result) router.push("/");
      else console.log('Some error at API');
    } catch (error: any) {
      console.log("Login failed", error.message);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.loginSignup}>
        <div className={styles.loginSignupContainer}>
          <h1>Login</h1>
          <div className={styles.loginSignupFields}>
            {/* Add signup form fields */}
            <input
              type="email"
              id="email"
              value={user.email}
              placeholder="Email Address"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <div className={styles.passwordCotainer}>
              <input
                type={showPass ? "text" : "password"}
                id="password"
                value={user.password}
                placeholder="Password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
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
          <button onClick={onLogin}>Login</button>
          <p className={styles.loginSignupLogin}>
            Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
          </p>
          <div className={styles.loginSignupAgree}>
            <input
              type="checkbox"
              name=""
              id=""
              style={{
                width: "30px",
                height: "30px",
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
