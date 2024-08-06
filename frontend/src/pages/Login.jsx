import { useLocation, useNavigate } from "react-router-dom";
import { useAuthenticate } from "../Contexts/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login, isAuthenticate, isLoading } = useAuthenticate();
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/app';
  useEffect(() => {
    if (isAuthenticate) {
      navigate(redirect);
    }
  }, [isAuthenticate, navigate,redirect]);

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function validatePassword(password) {
    return password.length >= 6;
  }

  function handleLogin(e) {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }

    if (valid) {
      login(email, password)
        .then(() => {
          setEmail("");
          setPassword("");
        })
        .catch((err) => {
          toast.error("Login failed. Please try again.");
        });
    }
  }
  const handleBackClick = () => {
    window.history.back();  
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.triangle}><img src="/icons/loginleft.png" alt="login" /></div>
      <div className={styles.formContainer}>
        <div className={styles.backButton} onClick={handleBackClick}>&larr;</div>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={emailError ? styles.errorLabel : ""}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={emailError ? styles.errorInput : ""}
              aria-describedby="email-error"
            />
            {emailError && <p id="email-error" className={styles.errorMessage}>{emailError}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={passwordError ? styles.errorLabel : ""}>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={passwordError ? styles.errorInput : ""}
              aria-describedby="password-error"
            />
            {passwordError && <p id="password-error" className={styles.errorMessage}>{passwordError}</p>}
          </div>
          <button type="submit" className={styles.loginButton} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className={styles.registerText}>
          Don't have an account? <a href="/register">Register now</a>
        </p>
      </div>
      <div className={styles.circles}>
        <div className={styles.circle1}><img src="/icons/loginright.png" alt="login"/></div>
        <div className={styles.circle2}><img src="/icons/loginbottom.png" alt="login"/></div>
      </div>
    </div>
  );
};

export default Login;
