import { createContext, useContext, useEffect, useState } from "react";
import { FORMS_URL } from "../constants";
import toast from "react-hot-toast";

const URL = FORMS_URL;

const FormContext = createContext();

function FormProvider({ children }) {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formContent,setFormContent] = useState([]);
  const [currentForm, setCurrentForm] = useState();
  const [currentFormData, setCurrentFormData] = useState({});
  // Function to fetch all folders
  const getAllForms = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${URL}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.status === "fail") {
        toast.error(data.message);
      } else {
        setForms(data.data.data);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching folders");
    } finally {
      setIsLoading(false);
    }
  };

  const getForm = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${URL}${id}`, {
        method: "GET",
        credentials: "include",
      });
  
      if (!res.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
  
      if (data.status === "fail") {
        toast.error(data.message);
        return; // Exit early if the status is "fail"
      }
  
      // Check if the data contains the necessary fields
      if (data.data && data.data.doc) {
        setFormContent(data.data.doc.content);
        setCurrentFormData(data.data.doc);
      } else {
        throw new Error('Unexpected response structure');
      }
  
    } catch (error) {
      console.error("Error fetching form data:", error); // Log error details for debugging
      toast.error("Something went wrong while fetching form");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch folders on component mount
  // useEffect(() => {
  //   getAllForms();
  // }, []);

  const createForm= async (formdata) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (data.status === "fail") {
        toast.error(data.message);
      } else {

        setCurrentForm(data.data.data._id);
        
        toast.success("Form created successfully!");
        // Re-fetch folders to ensure the list is updated
        await getAllForms();
        return { formId: data.data.data._id };
      }
    } catch (error) {
      toast.error("Something went wrong while creating the form");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const updateForm= async (formdata,id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${URL}${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (data.status === "fail" || data.status === "error") {
        toast.error(data.message);
      } else {

        setCurrentForm(id);
        
        toast.success("Form updated successfully!");
        // Re-fetch folders to ensure the list is updated
        await getAllForms();
        return { formId: id };
      }
    } catch (error) {
      toast.error("Something went wrong while updating the form");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteForm = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${URL}${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      // Check for 204 status and handle it appropriately
      if (res.status === 204) {
        toast.success("Form deleted successfully!");
        // Re-fetch folders to ensure the list is updated
        await getAllForms();
      } else {
        // For other status codes, attempt to parse JSON
        const data = await res.json();

        if (data.status === "fail") {
          toast.error(data.message);
        } else {
          toast.success("Form deleted successfully!");
          // Re-fetch folders to ensure the list is updated
          await getAllForms();
        }
      }
    } catch (error) {
      console.error("Error during form deletion:", error);
      toast.error("Something went wrong while deleting the form");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContext.Provider
      value={{ forms, isLoading, createForm, updateForm, deleteForm,formContent,setFormContent,setCurrentForm,currentForm,setCurrentFormData,currentFormData,getForm,getAllForms}}
    >
      {children}
    </FormContext.Provider>
  );
}

function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
}

export { FormProvider, useForm };
