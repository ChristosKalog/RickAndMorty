import React from "react";
import styles from "../css/fullSizeImageModal.module.css"; // New CSS file for modal
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const FullSizeImageModal = ({ character, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.buttonContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>
      </div>
      <div className={styles.modalContent} onClick={onClose}>
        <h2>{character.name}</h2>
        <img
          src={character.image}
          alt={character.name}
          className={styles.fullSizeImage}
        />
      </div>
    </div>
  );
};

export default FullSizeImageModal;
