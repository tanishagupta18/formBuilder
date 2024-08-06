import React, { useState } from "react";
import styles from "./SettingsForm.module.css";
import { CiUser, CiLock } from "react-icons/ci";
import { IoEyeOutline, IoLogOutOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useAuthenticate } from "../Contexts/AuthContext";

const SettingsForm = () => {
  const {user,isLoading,updateUser,updatePassword,logout} = useAuthenticate();
  
  console.log(user)
  const [formValues, setFormValues] = useState({
    name: user?.name,
    email: user?.email,
    oldPassword: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
  });

  const [formErrors, setFormErrors] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // Handle form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });

    // Validate password fields on change
    if (name === "oldPassword" || name === "newPassword") {
      if (value && value.length < 6) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Password must be at least 6 characters",
        }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if passwords are valid
    if (
      (formValues.oldPassword && formValues.oldPassword.length < 6) ||
      (formValues.newPassword && formValues.newPassword.length < 6)
    ) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formValues.name && !formValues.oldPassword && !formValues.newPassword) {
      updateMe(formValues.name);
    } else if (formValues.oldPassword && formValues.newPassword) {
      updatePassword(formValues.oldPassword, formValues.newPassword);
    }
  };

 
  const updateMe = (name) => {
    updateUser(name)
  };

 
  if(isLoading) return <p>Loading</p>
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <CiUser className={styles.icon} />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <CiLock className={styles.icon} />
            <input
              type="email"
              placeholder="Update Email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              className={styles.input}
              readOnly
            />
            <IoEyeOutline className={styles.icon} style={{ visibility: "hidden" }} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <CiLock className={styles.icon} />
            <input
              type={showPassword.oldPassword ? "text" : "password"}
              placeholder="Old Password"
              name="oldPassword"
              value={formValues.oldPassword}
              onChange={handleInputChange}
              className={styles.input}
            />
            <IoEyeOutline
              className={styles.icon}
              onClick={() => togglePasswordVisibility("oldPassword")}
            />
          </div>
          {formErrors.oldPassword && (
            <p className={styles.error}>{formErrors.oldPassword}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <CiLock className={styles.icon} />
            <input
              type={showPassword.newPassword ? "text" : "password"}
              placeholder="New Password"
              name="newPassword"
              value={formValues.newPassword}
              onChange={handleInputChange}
              className={styles.input}
            />
            <IoEyeOutline
              className={styles.icon}
              onClick={() => togglePasswordVisibility("newPassword")}
            />
          </div>
          {formErrors.newPassword && (
            <p className={styles.error}>{formErrors.newPassword}</p>
          )}
        </div>

        <button type="submit" className={styles.updateButton}>
          Update
        </button>
      </form>
      <button className={styles.logoutButton} onClick={logout}>
        <IoLogOutOutline /> Log out
      </button>
    </div>
  );
};

export default SettingsForm;
