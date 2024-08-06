import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "../Contexts/FormContext";
import { useFolder } from "../Contexts/FolderContext";
import styles from "./BuilderHeader.module.css";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import CopyNotification from "./CopyNotification";

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (e) {
    return false;
  }
};

const BuilderHeader = ({ currentPage, setCurrentPage, setErrors }) => {
  const { currentForm, formContent, createForm, setFormContent,currentFormData,updateForm,isLoading } = useForm();
  const {theme,name} = currentFormData;
  const { activeFolder } = useFolder();
  const [formName, setFormName] = useState(name || '');
  const [formError, setFormError] = useState('');
  const [showMessage, setShowMessage] = useState(false)
  const navigate = useNavigate();
  const {id} = useParams();
  const isFormAvailable = Boolean(id); // Check if currentForm is set

  useEffect(() => {
    setFormName(name || '');
  }, [name]);
  // Handler to change the current page
  const handlePageChange = (page) => {
    if (isFormAvailable) {
      setCurrentPage(page);
    }
  };

  const copyTextToClipboard = async () => {
    if(id){
      try {
        await navigator.clipboard.writeText(`${window.location.origin}/form/${id}`);
        setShowMessage(true);
        setTimeout(function(){
          setShowMessage(false);
        },2000)
      } catch (err) {
        toast.error('Failed to copy text: ', err);
      }
    }
   
  };
  const handleSaveForm = async () => {
    if (formContent.length === 0) {
      toast.error("Please add form content");
      return;
    }
  
    const newErrors = {};
    let formError = '';
  
    // Validate form name
    if (formName.length < 1) {
      formError = 'Required Field';
    }
  
    // Validate form content
    formContent.forEach(item => {
      if (item.type === 'bubble') {
        if (!item.placeholder) {
          newErrors[item.id] = 'Required Field';
        } else if (!isValidUrl(item.placeholder) && item.input_type != 'Text') {
          newErrors[item.id] = 'Invalid URL format';
        } else {
          delete newErrors[item.id];
        }
      } else if (item.input_type === 'Button') {
        if (!item.placeholder) {
          newErrors[item.id] = 'Required Field';
        }
      }
    });
  
    // Update error state
    setErrors(newErrors);
    setFormError(formError);
  
    // Proceed if there are no errors
    if (!formError && Object.keys(newErrors).length === 0) {
      const formPayload = {
        name: formName,
        content: formContent,
        theme:theme,
        ...(activeFolder && { folder: activeFolder }) // Conditionally include activeFolder
      };
  
      try {
        
          const response = (id) ? await updateForm(formPayload,id) : await createForm(formPayload);
        
        

      // Check if response contains new form ID
      if (response && response.formId) {
        if(!id){
          setFormContent([]);
        setFormName('');
        }
        
        navigate(`/app/typebots/${response.formId}`);
      } else {
        console.warn("No formId received in response");
      }
      } catch (error) {
        toast.error("Something went wrong while saving the form");
      }
    }
  };
  
  return (
    <div className={styles.header}>  
      <div>
      {currentPage === 'flow' && (
        <>
          <input
            type="text"
            placeholder="Enter Form Name"
            className={`${styles.formNameInput} ${formError ? styles.errorInput : ''}`}
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
          {formError && <span className={styles.errorMessage}>{formError}</span>}
        </>
      )}
    </div>

      <div className={styles.headerButtons}>
        <button
          className={`${styles.headerButton} ${currentPage === "flow" ? styles.active : ""}`}
          onClick={() => handlePageChange("flow")}
          aria-label="Flow Page"
          disabled={!isFormAvailable}
        >
          Flow
        </button>
        <button
          className={`${styles.headerButton} ${currentPage === "theme" ? styles.active : ""}`}
          onClick={() => handlePageChange("theme")}
          aria-label="Theme Page"
          disabled={!isFormAvailable}
        >
          Theme
        </button>
        <button
          className={`${styles.headerButton} ${currentPage === "response" ? styles.active : ""}`}
          onClick={() => handlePageChange("response")}
          aria-label="Response Page"
          disabled={!isFormAvailable}
        >
          Response
        </button>
      </div>
      <div className={styles.actionButtons}>
        <button
          className={styles.shareButton}
          aria-label="Share Form"
          disabled={!isFormAvailable}
          onClick={copyTextToClipboard}
        >
          Share
        </button>
        <button
          className={styles.saveButton}
          aria-label="Save Form"
          onClick={handleSaveForm}
        >
          Save
        </button>
        <NavLink to='/app/dashboard' aria-label="Close Form Editor" className={styles.closeButton}>
          <RxCross1 />
        </NavLink>
        {showMessage && <CopyNotification /> }
      </div>
    </div>
  );
};

export default BuilderHeader;
