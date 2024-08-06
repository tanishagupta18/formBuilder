import { createContext, useContext, useEffect, useState } from "react";
import { FOLDERS_URL } from "../constants";
import toast from "react-hot-toast";

const URL = FOLDERS_URL;

const FolderContext = createContext();

function FolderProvider({ children }) {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFolder, setActiveFolder] = useState(0);
  // Function to fetch all folders
  const getAllFolders = async () => {
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
        setFolders(data.data.data);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching folders");
    } finally {
      setIsLoading(false);
    }
  };

  // // Fetch folders on component mount
  // useEffect(() => {
  //   getAllFolders();
  // }, []);

  const createFolder = async (name) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (data.status === "fail") {
        toast.error(data.message);
      } else {
        toast.success("Folder created successfully!");
        // Re-fetch folders to ensure the list is updated
        await getAllFolders();
      }
    } catch (error) {
      toast.error("Something went wrong while creating the folder");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFolder = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${URL}${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      // Check for 204 status and handle it appropriately
      if (res.status === 204) {
        toast.success("Folder deleted successfully!");
        // Re-fetch folders to ensure the list is updated
        await getAllFolders();
      } else {
        // For other status codes, attempt to parse JSON
        const data = await res.json();

        if (data.status === "fail") {
          toast.error(data.message);
        } else {
          toast.success("Folder deleted successfully!");
          // Re-fetch folders to ensure the list is updated
          await getAllFolders();
        }
      }
    } catch (error) {
      console.error("Error during folder deletion:", error);
      toast.error("Something went wrong while deleting the folder");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FolderContext.Provider
      value={{ folders, isLoading, createFolder, deleteFolder,activeFolder,setActiveFolder,getAllFolders }}
    >
      {children}
    </FolderContext.Provider>
  );
}

function useFolder() {
  const context = useContext(FolderContext);
  if (context === undefined) {
    throw new Error("useFolder must be used within a FolderProvider");
  }
  return context;
}

export { FolderProvider, useFolder };
