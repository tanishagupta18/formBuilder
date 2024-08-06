import React, {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";
import styles from "./Modal.module.css";

// Create a context to manage modal state
const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState(""); // State to track the currently open modal

  const open = (name) => setOpenName(name); // Function to open a modal by name
  const close = () => setOpenName(""); // Function to close the currently open modal

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(ModalContext); // Access the open function from context

  // Clone the child element and attach an onClick handler
  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext); // Access modal state from context
  const ref = useOutsideClick(close); // Custom hook to close modal on outside click

  if (name !== openName) return null; // Render nothing if this modal is not open

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal} ref={ref}>
        {/* <button className={styles.button} onClick={close}>
          <HiXMark />
        </button> */}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

// Assign subcomponents to the Modal component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
