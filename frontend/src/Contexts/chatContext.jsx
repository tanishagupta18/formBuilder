import React, { createContext, useState } from 'react';
import { FORMS_URL,RESPONSE_URL } from "../constants";

import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';
// Create the context
export const ChatContext = createContext();
const URL = FORMS_URL;
// Create a provider component
export const ChatProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [currentResponseId, setCurrentResponseId] = useState(0);
  const [formID, setFormID ] = useState(0);
  // Function to go to the next item
  const nextStep = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Function to save response
  const saveResponse = async (index, response) => {
    const updatedResponses = { ...responses, [index]: response };
    const responseData = { form: formID, responses: updatedResponses };
    console.log("Response Data:", responseData);
    try {
      if (!currentResponseId) {
        // Create a new response
        const res = await fetch(`${RESPONSE_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responseData),
        });
  
        const data = await res.json();
  
        if (data.status === "fail") {
          toast.error(data.message);
        } else {
          setCurrentResponseId(data.data.data._id);
          setResponses(updatedResponses);
          // toast.success("Form created successfully!");
          // Re-fetch folders to ensure the list is updated
          // await getAllForms();
        }
      } else {
        // Update the existing response
        const res = await fetch(`${RESPONSE_URL}${currentResponseId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responseData), // Include `form` and `responses`
        });
  
        const data = await res.json();
  
        if (data.status === "fail" || data.status === 'error') {
          toast.error(data.message);
        } else {
          setResponses(updatedResponses);
          // toast.success("Form updated successfully!");
          // Re-fetch folders to ensure the list is updated
          // await getAllForms();
        }
      }
    } catch (error) {
      toast.error("Something went wrong while saving the form");
    }
  };
  
  const handleInputSubmit = async (value) => {
    if (value) {
      try {
        // Attempt to save the response
        await saveResponse(currentIndex, value);
        
        // Proceed to the next step only if saveResponse succeeds
        nextStep();
      } catch (error) {
        // Handle the error (e.g., show a toast message or log the error)
        toast.error("There is something issue. Please try again.");
      }
    }
  };
  const getFormContent = async (id,signal) => {
          setResponses({});
          setCurrentResponseId(0);
          setFormID(0);
    try {
      const res = await fetch(`${URL}form/${id}`,{
        method: "GET",
        credentials: "include",
        // signal: signal,
      });
  
      if (!res.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
  
      if (data.status === "fail" || data.status == 'error') {
        toast.error(data.message);
        return; // Exit early if the status is "fail"
      }
  
      // Check if the data contains the necessary fields
      if (data.data && data.data.doc) {
        setFormID(data.data.doc._id);
        return data.data.doc;
      } else {
        return null;
      }
  
    } catch (error) {
      console.error("Error fetching form data:", error); // Log error details for debugging
      // toast.error("Something went wrong while fetching form");
    }
  };
  return (
    <ChatContext.Provider value={{ currentIndex, nextStep, responses, saveResponse,handleInputSubmit ,getFormContent}}>
      {children}
    </ChatContext.Provider>
  );
};
