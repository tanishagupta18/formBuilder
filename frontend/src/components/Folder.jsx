import { RiDeleteBin6Line } from "react-icons/ri";
import styles from './Folder.module.css';
import Modal from "./Modal";
import Button from "./Button";
import ConfirmDelete from "./ConfirmDelete";
import { useFolder } from "../Contexts/FolderContext";
const Folder = ({ folder }) => {
  const {isLoading, deleteFolder,activeFolder,setActiveFolder} = useFolder();

  return (
    <div className={`${styles.folder} ${activeFolder && activeFolder === folder._id ? styles.active : ''}`} onClick={()=>setActiveFolder(folder._id)}>
      <Modal><span>{folder.name}</span><span style={{color:'#F55050',marginTop:'2.5px'}}><Modal.Open opens="delete">
              <RiDeleteBin6Line />
            </Modal.Open></span>
        
        <Modal.Window name="delete">
          <ConfirmDelete
            disabled={isLoading}
            onConfirm={() =>
              deleteFolder(folder._id)
            }
          />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default Folder;
