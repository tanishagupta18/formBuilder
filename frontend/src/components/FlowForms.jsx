import { NavLink } from "react-router-dom";
import Form from "../components/Form";
import CreateForm from "./CreateForm";
import styles from "./FlowForms.module.css";
import { useFolder } from "../Contexts/FolderContext";
import { useForm } from "../Contexts/FormContext";
import Spinner from "./Spinner";
import { useEffect } from "react";

const FlowForms = () => {
  const { isLoading, activeFolder } = useFolder();
  const { isLoading: isLoadingForm, forms,getAllForms,deleteForm} = useForm();

  useEffect(()=>{
    getAllForms();
  },[])
  
  if (isLoading || isLoadingForm) {
    return <Spinner />;
  }

  // Filter forms based on activeFolder and default folder
  
  const filteredForms = forms.filter((form) => 
    activeFolder ? form.folder === activeFolder : form.folder === null
  );
  
  const handleDeleteForm = (e,formId) => {
    e.preventDefault(); 
    if (window.confirm("Are you sure you want to delete this form?")) {
      deleteForm(formId); // Call the deleteForm function from context
    }
    return false;
  };
  return (
    <div className={styles.formContainer}>
      <ul className={styles.formList}>
        <NavLink to="/app/typebots">
          <CreateForm />
        </NavLink>
        {filteredForms.map((form) => (
          <li key={form._id}>
          <NavLink to={`/app/typebots/${form._id}`}>
            <Form 
              form={form} 
              onClick={(e) => handleDeleteForm(e, form._id)} 
            />
          </NavLink>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default FlowForms;
