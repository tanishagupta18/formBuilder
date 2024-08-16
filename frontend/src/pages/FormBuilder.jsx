import React, { useState } from "react";
import styles from "./FormBuilder.module.css";
import BuilderSidebar from "../components/BuilderSidebar";
import { useForm } from "../Contexts/FormContext";
import { TiFlag } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";



const MainContent = ({errors}) => {
  const { formContent, setFormContent } = useForm();
  const {id} = useParams();
  const typeCountMap = {};
  const handleInputChange = (uid, value) => {
    
    setFormContent(prevContent =>
      prevContent.map(item =>
        item.id === uid || item._id === uid ? { ...item, placeholder: value } : item
      )
    );
  };

  const handleDelete = (uid) => {
    if(!id){
      setFormContent(prevContent => prevContent.filter(item => item.id !== uid));
    }else{
      toast.error(`You can't add or delete the Bubble and input after saving the form`)
     }
    
  };

  
  return (
    <div className={styles.mainContent}>
      <div className={styles.startNode}>
        <span style={{ fontSize: '18px' }}><TiFlag /></span> Start
      </div>

      {formContent && formContent.map((content, index) => {
        const { input_type } = content;

        // Initialize the counter for this input_type if it doesn't exist
        if (!typeCountMap[input_type]) {
          typeCountMap[input_type] = 1;
        } else {
          typeCountMap[input_type] += 1;
        }
        const content_id = content.id || content._id;
        const handleChange = (e) => handleInputChange(content_id, e.target.value);
        const occurrenceCount = typeCountMap[input_type];
        const displayText = `${input_type} ${occurrenceCount}`;

        const errorMessage = errors[content_id];

        if (content.type === 'bubble') {
          return (
            <div key={index} className={styles.formNode}>
              <h4>{displayText}</h4>
              <input
                type="text"
                placeholder="Click to add link"
                className={`${styles.formInput} ${errorMessage ? styles.errorInput : ''}`}
                value={content.placeholder}
                onChange={handleChange}
              />
              {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
              <span
                className={styles.delete_btn}
                onClick={() => handleDelete(content_id)}
                aria-label="Delete item"
              >
                <RiDeleteBin6Line />
              </span>
            </div>
          );
        } else {
          return (
            <div key={index} className={styles.formNode}>
              <h4>{displayText}</h4>
              {input_type === "Button" ? (
                <input
                  type="text"
                  className={`${styles.formInput} ${errorMessage ? styles.errorInput : ''}`}
                  value={content.placeholder}
                  onChange={handleChange}
                />
              ) : (
                <div className={styles.hint}>
                  {`Hint: User will input a ${input_type.toLowerCase()} on this form`}
                </div>
              )}
                {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}

              <span
                className={styles.delete_btn}
                onClick={() => handleDelete(content.id)}
                aria-label="Delete item"
              >
                <RiDeleteBin6Line />
              </span>
            </div>
          );
        }
      })}
      
    </div>
  );
};

const FormBuilder = ({errors}) => {
  return (
    <div className={styles.body}>
      <BuilderSidebar />
      <MainContent errors = {errors}/>
    </div>
  );
};

export default FormBuilder;
