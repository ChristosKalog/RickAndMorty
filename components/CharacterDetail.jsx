import React, { useState } from "React";
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
        <div className={styles.specs}>
          <p>
            Status: <strong>{character.status}</strong>
          </p>
          <p>
            Species: <strong>{character.species}</strong>
          </p>
          <p>
            Gender: <strong>{character.gender}</strong>
          </p>
          {character.type && (
            <p>
              Type: <strong>{character.type}</strong>
            </p>
          )}
          <p>
            Origin: <strong>{character.origin.name}</strong>
          </p>
          <p>
            Location: <strong>{character.location.name}</strong>
          </p>
          <p>
            Created:{" "}
            <strong>{new Date(character.created).toLocaleDateString()}</strong>
          </p>
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
