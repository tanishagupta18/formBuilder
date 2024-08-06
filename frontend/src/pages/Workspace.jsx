import Header from "../components/Header";
import FlowForms from "../components/FlowForms";
import styles from "./Workspace.module.css";
import { useFolder } from "../Contexts/FolderContext";
import Folders from "../components/Folders";
import { useEffect } from "react";

const Workspace = () => {
  const { isLoading, folders,getAllFolders} = useFolder();
  useEffect(() => {
    getAllFolders()
  },[]);
  return (
    <div className={styles.workspace}>
      <Header />
      <hr />
      <div className={styles.content}>
        <div className={styles.stack}>
          <div className={styles.folders}>
            <Folders />
            <FlowForms />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
