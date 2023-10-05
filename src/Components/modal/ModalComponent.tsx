import React from "react";
import Modal from "react-modal";
import styles from "./ModalComponent.module.css";
import Close from "../icons/Close";

Modal.setAppElement("#root");
export default function ModalComponent({
  isOpen,
  children,
  onClose,
  title,
}: {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}) {
  if (!isOpen) return null;
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.header}>
          <h1>{title}</h1>
          <button onClick={onClose}>
            <Close />
          </button>
        </div>
        {children}
      </Modal>
    </div>
  );
}
