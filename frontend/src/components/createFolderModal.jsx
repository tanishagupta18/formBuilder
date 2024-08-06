import React, { useState } from 'react';
import styles from './CreateFolderModal.module.css'; // Import the CSS module
import { useFolder } from '../Contexts/FolderContext';

function CreateFolderModal({ onCreate = {}, onCloseModal }) {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState(''); // New state for managing errors
    const {isLoading, createFolder} = useFolder();
  const handleInputChange = (e) => {
    setFolderName(e.target.value);
    if (e.target.value.trim().length >= 3) {
      setError('');
    }
  };

  const handleCreate = () => {
    if (folderName.trim().length < 3) {
      setError('Folder name must be at least 3 characters long.');
    } else {
      createFolder(folderName);
      setFolderName('');
      onCloseModal?.();
    }
  };

  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>Create New Folder</h2>
      <input
        type="text"
        className={styles.input}
        placeholder="Enter folder name"
        value={folderName}
        onChange={handleInputChange}
        disabled = {isLoading}
      />
      {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
      <div className={styles.actions}>
        <button className={styles.buttonDone} onClick={handleCreate}>
          Done
        </button>
        <span style={{color: '#47474A',fontSize: '27px'}}>|</span>
        <button className={styles.buttonCancel} onClick={onCloseModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CreateFolderModal;
