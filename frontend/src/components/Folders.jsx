import Folder from "../components/Folder";
import styles from "./Folders.module.css";
import { useFolder } from "../Contexts/FolderContext";
import CreateFolder from "./CreateFolder";

const Folders = () => {
  const { isLoading, folders } = useFolder();
  return (
    <div className={styles.folderContainer}>
      <CreateFolder />
      {folders &&
        !isLoading &&
        folders.map((folder) => <Folder key={folder._id} folder={folder} />)}
      
    </div>
  );
};

export default Folders;
