import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/goBackButton.module.css'; // Import the CSS module

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page in the browser's history
  };

  return (
    <button onClick={handleGoBack} className={styles.goBackButton}>
      Go Back
    </button>
  );
};

export default GoBackButton;
