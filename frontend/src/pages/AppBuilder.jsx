import React, { useEffect, useState, useCallback } from "react";
import styles from "./AppBuilder.module.css";
import BuilderHeader from "../components/BuilderHeader";
import FormBuilder from "./FormBuilder";
import { useParams } from "react-router-dom";
import { useForm } from "../Contexts/FormContext";
import Spinner from "../components/Spinner";
import FormTheme from "./FormTheme";
import Response from "./Response";
const AppBuilder = () => {
  const [currentPage, setCurrentPage] = useState("flow");
  const [errors, setErrors] = useState({});
  const { setFormContent, getForm, setCurrentFormData,isLoading } = useForm();
  const { id } = useParams();
  
  useEffect(() => {
    // Define an async function within the effect
    const fetchFormData = async () => {
      try {
        // Reset state before fetching new data
        
        if (id) {
          await getForm(id);
        }else{
          setFormContent([]);
        setCurrentFormData({}); 
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData(); // Call the async function
  }, [id]); 

  if (isLoading) return <Spinner />;
  return (

    <div className={styles.container}>
      <BuilderHeader
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setErrors={setErrors}
      />
      {currentPage === "flow" && <FormBuilder errors={errors} />}
      {currentPage === "theme" && <FormTheme />}
      {currentPage === "response" && <Response />}
    </div>
  );
};

export default AppBuilder;
