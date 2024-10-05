import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/goBackButton.module.css';

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 

  return (
    <button onClick={handleGoBack} className={styles.goBackButton}>
      Go Back
    </button>
  );
};

export default GoBackButton;
