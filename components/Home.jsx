import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../css/home.module.css"; // Import the CSS module
import Footer from "./Footer"; 


export default function Home() {
  const [displayTitle, setDisplayTitle] = useState(""); // State to hold the current title display
  const finalTitle = "Rick and Morty API"; // Final title

  useEffect(() => {
    let currentTitle = Array(finalTitle.length).fill(""); // Initialize an array with empty values
    let completedCharacters = 0; // Track how many characters are completed
    let interval;

    const randomizeTitle = () => {
      interval = setInterval(() => {
        currentTitle = currentTitle.map((char, index) => {
          // Only update characters that haven't been finalized yet
          if (char === finalTitle[index]) {
            return char; // Keep the correct character in place
          }

          // Randomly change characters if not final
          return String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random uppercase letter
        });

        setDisplayTitle(currentTitle.join("")); // Update the display title

        // Gradually replace random characters with the final title
        if (completedCharacters < finalTitle.length) {
          currentTitle[completedCharacters] = finalTitle[completedCharacters];
          completedCharacters++;
        }

        // Once all characters are correct, show the final title and stop the interval
        if (completedCharacters >= finalTitle.length) {
          clearInterval(interval); // Stop the interval once the title is fully decoded
          setDisplayTitle(finalTitle); // Ensure the final title is displayed correctly
        }
      }, 50); // Update every 100ms (adjust if necessary)
    };

    randomizeTitle();

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [finalTitle]);

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.mainTitle}>
        <h1>{displayTitle}</h1> {/* Display the animated title */}
      </div>
      <div className={styles.linkButtonContainer}>
        <Link to="/characters">
          <button className={styles.linkButton}>See Characters</button>
        </Link>
        <Link to="/episodes">
          <button className={styles.linkButton}>See Episodes</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
