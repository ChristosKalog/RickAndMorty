import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "../css/characterDetail.module.css";
import FullSizeImageModal from "./FullSizeImageModal";

export default function CharacterDetail({ characters }) {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const character = characters.find((char) => char.id === parseInt(id));
  if (!character) return <div>Loading...</div>;

  const handleImageClick = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <>
      <div className={styles.characterDetailContainer}>
        <div className={styles.buttonHeader}>
          <Link to="/characters">
            <button className={styles.goBackButton}>Go Back</button>
          </Link>
        </div>

        <h1>{character.name}</h1>

        <div className={styles.horizontalContainer}>
          <img
            src={character.image}
            alt={character.name}
            className={styles.characterImage}
            onClick={handleImageClick}
          />
          <div className={styles.specsContainer}>
            <div className={styles.specs}>
              <p>Status:</p>
              <p>Species:</p>
              <p>Gender:</p>
              {character.type && <p> Type:</p>}
              <p>Origin:</p>
              <p>Location:</p>
              <p>Created: </p>
            </div>
            <div className={styles.specs}>
              <p><strong>{character.status}</strong></p>
              <p><strong>{character.species}</strong></p>
              <p><strong>{character.gender}</strong>
              </p>
              {character.type && (
                <p><strong>{character.type}</strong></p>
              )}
              <p><strong>{character.origin.name}</strong></p>
              <p><strong>{character.location.name}</strong>
              </p>
              <p><strong>
                  {new Date(character.created).toLocaleDateString()}
                </strong>
              </p>
            </div>
          </div>
        </div>
        <h2>Episodes</h2>
        <ul>
          {character.episode.map((episodeUrl, index) => (
            <li key={index}>Episode {index + 1}</li>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <FullSizeImageModal character={character} onClose={handleCloseModal} />
      )}
    </>
  );
}
