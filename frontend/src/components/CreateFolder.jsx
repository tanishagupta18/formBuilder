
import { MdOutlineCreateNewFolder } from "react-icons/md";
import styles from './CreateFolder.module.css';
import Modal from "./Modal";
import CreateFolderModal from "./createFolderModal";

const CreateFolder = () => {
  return (
    <Modal>
        <Modal.Open opens="folder-form">
        <div className={styles.folder}>
      <MdOutlineCreateNewFolder />
      Create New Folder
    </div>
        </Modal.Open>
        <Modal.Window name="folder-form">
          <CreateFolderModal />
        </Modal.Window>
      </Modal>
  );
};

export default CreateFolder;
