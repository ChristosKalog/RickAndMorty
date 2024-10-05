import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "../css/episodes.module.css"; 

export default function Episodes({ episodes }) {
  const [displayedEpisodes, setDisplayedEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [isFavoriteEpisode, setIsFavoriteEpisode] = useState("All");
  const [isDark, setIsDark] = useState(false);
  const [favEpisodes, setFavEpisodes] = useState([]);

  useEffect(() => {
    setDisplayedEpisodes(episodes);
    const savedFavorites =
      JSON.parse(localStorage.getItem("favEpisodes")) || [];
    setFavEpisodes(savedFavorites);
  }, [episodes]);

  useEffect(() => {
    localStorage.setItem("favEpisodes", JSON.stringify(favEpisodes));
  }, [favEpisodes]);

  const handleChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  const seeFavoriteEpisodes = () => {
    if (isFavoriteEpisode === "All") {
      setIsFavoriteEpisode("Favorites");
    } else {
      setIsFavoriteEpisode("All");
    }
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setIsDark(savedMode === "true"); // Convert string to boolean
    }
  }, []);

  const toggleMode = () => {
    setIsDark((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode); // Save the new mode as a string
      return newMode;
    });
  };

  const darkClass = isDark ? styles.darkMode : styles.lightMode;

  const filteredEpisodes = useMemo(() => {
    const filtered = displayedEpisodes.filter((episode) => {
      const matchesSeason = selectedSeason
        ? episode.episode[2] === selectedSeason
        : true;
      return matchesSeason;
    });

    if (isFavoriteEpisode === "Favorites") {
      return filtered.filter((episode) =>
        favEpisodes.includes(episode.episode)
      );
    }

    return filtered;
  }, [displayedEpisodes, selectedSeason, isFavoriteEpisode, favEpisodes]);

  const handleIconClick = (event) => {
    const episodeId = event.currentTarget.id;
    addToFavorites(episodeId);
  };

  const handleContainerDoubleClick = (episodeId) => {
    addToFavorites(episodeId);
  };

  const addToFavorites = (episodeId) => {
    setFavEpisodes((prev) => {
      if (prev.includes(episodeId)) {
        return prev.filter((id) => id !== episodeId);
      } else {
        return [...prev, episodeId];
      }
    });
  };

  const clearFavorites = () => {
    setFavEpisodes([]);
    localStorage.removeItem("favEpisodes");
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.buttonHeader}>
          <div className={styles.leftButtonsContainer}>
            <select
              onChange={handleChange}
              value={selectedSeason}
              className={`${styles.seasonSelect} ${darkClass}`}
            >
              <option value="">All Seasons</option>
              <option value="1">Season 1</option>
              <option value="2">Season 2</option>
              <option value="3">Season 3</option>
              <option value="4">Season 4</option>
              <option value="5">Season 5</option>
            </select>
            <div
              className={`${styles.seasonSelect} ${darkClass}`}
              onClick={seeFavoriteEpisodes}
            >
              {isFavoriteEpisode === "All" ? "Show Favorites" : "Show All"}
            </div>
          </div>

          <div className={styles.icon} onClick={toggleMode}>
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
          </div>
        </div>
        <div className={`${styles.mainEpisodeContainer} ${darkClass}`}>
          <div
            className={styles.episodesContainer}
          >
            {filteredEpisodes.length > 0 ? (
              filteredEpisodes.map((episode) => (
                <div
                  key={episode.id}
                  className={`${styles.episodeElem} ${darkClass}`}
                  onDoubleClick={() => handleContainerDoubleClick(episode.episode)} // Handle double-click on container//

                >
                  <div className={styles.topSection}>
                    <FontAwesomeIcon
                      id={episode.episode}
                      onClick={handleIconClick}
                      className={`${styles.heartIcon} fa-xl ${
                        favEpisodes.includes(episode.episode)
                          ? styles.heartIconFavorite
                          : ""
                      }`}
                      icon={faHeart}
                    />
                    <div className={styles.rightSection}>
                      <div className={styles.noMarginPlease}>
                        <p>{episode.episode}</p>
                      </div>
                      <div>
                        <p>{episode.air_date}</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.botSection}>
                    <h1>{episode.name}</h1>
                  </div>
                </div>
              ))
            ) : (
              <p>
                {isFavoriteEpisode === "Favorites"
                  ? "No favorite episodes for this season."
                  : "No episodes available for this season."}
              </p>
            )}
          </div>
        </div>
        <div className={styles.buttonHeader}>
          <p>Episodes Rendered: {filteredEpisodes.length}</p>
          {favEpisodes.length > 0 && (
            <button
              onClick={clearFavorites}
              className={styles.clearFavoritesButton}
            >
              Clear Favorites
            </button>
          )}
        </div>
        <Link to="/">
          <button className={styles.goBackButton}>Go Back</button>
        </Link>
      </div>
    </>
  );
}
