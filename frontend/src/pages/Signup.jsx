// src/components/SignUp.js

import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import { useAuthenticate } from "../Contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  
  let isValid = true;
  const { signup, isAuthenticate, isLoading } = useAuthenticate();
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/app';
  useEffect(() => {
    if (isAuthenticate) {
      navigate(redirect);
    }
  }, [isAuthenticate, navigate,redirect]);

  const validateEmail = (email) => {
    // Basic email validation regex pattern
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  function validatePassword(password) {
    return password.length >= 6;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error messages and success message
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
   

    
    // Validate username
    if (!username) {
      setUsernameError("Username is required.");
      isValid = false;
    } else if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
      isValid = false;
    }

    // Validate email
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 6 characters long"
      );
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    if (isValid) {
      signup(username,email, password,confirmPassword)
        .then(() => {
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        })
        .catch((err) => {
          toast.error("Login failed. Please try again.");
        });
    }
   

  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.triangle}>
        <img src="/icons/loginleft.png" alt="login" />
      </div>
      <div className={styles.formContainer}>
        <div className={styles.backButton} onClick={handleBackClick}>
          &larr;
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={usernameError ? styles.errorLabel : ""}>Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter a username"
              value={username}
              className={usernameError ? styles.errorInput : ""}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && (
              <p id="username-error" className={styles.errorMessage}>
                {usernameError}
              </p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={emailError ? styles.errorLabel : ""}>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              className={emailError ? styles.errorInput : ""}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p id="email-error" className={styles.errorMessage}>
                {emailError}
              </p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={passwordError ? styles.errorLabel : ""}>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              className={passwordError ? styles.errorInput : ""}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p id="password-error" className={styles.errorMessage}>
                {passwordError}
              </p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={confirmPasswordError ? styles.errorLabel : ""}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className={confirmPasswordError ? styles.errorInput : ""}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError && (
              <p id="confirm-password-error" className={styles.errorMessage}>
                {confirmPasswordError}
              </p>
            )}
          </div>
          <button type="submit" className={styles.signupButton}>
            Sign Up
          </button>
        </form>
        <p className={styles.loginText}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
      <div className={styles.circles}>
        <div className={styles.circle1}>
          <img src="/icons/loginright.png" alt="login" />
        </div>
        <div className={styles.circle2}>
          <img src="/icons/loginbottom.png" alt="login" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
