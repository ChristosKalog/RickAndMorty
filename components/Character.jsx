import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "../css/character.module.css"; // Import the CSS module
import CharacterFilters from "./CharacterFilters"; // Import CharacterFilters


export default function Character({ characters }) {
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [characterCount, setCharacterCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [trigger, setTrigger] = useState(0);
  const [genderFilter, setGenderFilter] = useState("");
  const [liveStatusFilter, setLiveStatusFilter] = useState("");

  const [alivePressed, setAlivePressed] = useState(false);
  const [deadPressed, setDeadPressed] = useState(false);
  const [womenPressed, setWomenPressed] = useState(false);
  const [menPressed, setMenPressed] = useState(false);
  const [genderlessPressed, setGenderlessPressed] = useState(false);
  const [showingFavorites, setShowingFavorites] = useState(false);

  useEffect(() => {
    const getRandomCharacters = (count) => {
      const shuffled = [...characters].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    setDisplayedCharacters(getRandomCharacters(characterCount));
  }, [characters, characterCount, trigger]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setFavoriteCharacters(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(favoriteCharacters));
  }, [favoriteCharacters]);

  const filteredCharacters = useMemo(() => {
    return displayedCharacters.filter((character) => {
      const matchesSearch = character.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGender = genderFilter
        ? character.gender === genderFilter
        : true;
      const matchesStatus = liveStatusFilter
        ? character.status === liveStatusFilter
        : true;
      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [displayedCharacters, searchQuery, genderFilter, liveStatusFilter]);

  const filteredFavoriteCharacters = useMemo(() => {
    return favoriteCharacters.filter((character) => {
      const matchesGender = genderFilter
        ? character.gender === genderFilter
        : true;
      return matchesGender;
    });
  }, [favoriteCharacters, genderFilter]);

  const handleRenderCountChange = useCallback(
    (count) => {
      setSearchQuery("");
      setGenderFilter("");
      setShowingFavorites(false);
      setCharacterCount(count === "all" ? characters.length : count);
      setTrigger((prev) => prev + 1);
    },
    [characters.length]
  );

  const handleInputChange = useCallback((event) => {
    const { value } = event.target;
    setCharacterCount(Number(value));
    setShowingFavorites(false);
  }, []);

  const handleCustomRender = useCallback(() => {
    setSearchQuery("");
    setGenderFilter("");
    setTrigger((prev) => prev + 1);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setGenderFilter("");
    setSearchQuery(event.target.value);
  }, []);

  const addToFavorites = useCallback(
    (id) => {
      const favorite = characters.find((character) => id === character.id);
      if (favorite) {
        setFavoriteCharacters((prev) => {
          if (prev.some((char) => char.id === favorite.id)) {
            return prev.filter((char) => char.id !== favorite.id);
          } else {
            return [...prev, favorite];
          }
        });
      }
    },
    [characters]
  );

  const removeFromFavorites = useCallback((id) => {
    setFavoriteCharacters((prev) =>
      prev.filter((character) => character.id !== id)
    );
  }, []);

  const showFavorites = useCallback(() => {
    setShowingFavorites((prev) => !prev);
  }, []);

  const renderAlive = useCallback(() => {
    setDeadPressed(false);
    setAlivePressed(true);
    setLiveStatusFilter("Alive");
  }, []);

  const renderDead = useCallback(() => {
    setAlivePressed(false);
    setDeadPressed(true);
    setLiveStatusFilter("Dead");
  }, []);

  const clearFavorites = useCallback(() => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all favorites?"
    );
    if (confirmed) {
      setFavoriteCharacters([]);
    }
  }, []);

  const renderWomen = useCallback(() => {
    setGenderFilter("Female");
    setWomenPressed(true);
    setMenPressed(false);
    setGenderlessPressed(false);
  }, []);

  const renderMen = useCallback(() => {
    setGenderFilter("Male");
    setWomenPressed(false);
    setMenPressed(true);
    setGenderlessPressed(false);
  }, []);

  const renderGenderless = useCallback(() => {
    setGenderFilter("Genderless");
    setWomenPressed(false);
    setMenPressed(false);
    setGenderlessPressed(true);
  }, []);

  const renderClear = useCallback(() => {
    setGenderFilter("");
    setLiveStatusFilter("");
    setWomenPressed(false);
    setMenPressed(false);
    setAlivePressed(false);
    setDeadPressed(false);
    setGenderlessPressed(false);
  }, []);

  const charactersToDisplay = showingFavorites
    ? filteredFavoriteCharacters
    : filteredCharacters;

  return (
    <section className={styles.mainContainer}>
      <CharacterFilters
        handleRenderCountChange={handleRenderCountChange}
        handleCustomRender={handleCustomRender}
        handleInputChange={handleInputChange}
        handleSearchChange={handleSearchChange}
        renderAlive={renderAlive}
        renderDead={renderDead}
        renderWomen={renderWomen}
        renderMen={renderMen}
        renderGenderless={renderGenderless}
        renderClear={renderClear}
        showFavorites={showFavorites}
        clearFavorites={clearFavorites}
        alivePressed={alivePressed}
        deadPressed={deadPressed}
        womenPressed={womenPressed}
        menPressed={menPressed}
        genderlessPressed={genderlessPressed}
        showingFavorites={showingFavorites}
        favoriteCharacters={favoriteCharacters}
        characterCount={characterCount}
        searchQuery={searchQuery}
      />
      <div className={styles.charContainer}>
        {charactersToDisplay.length === 0 ? (
          <p>No characters to show!</p>
        ) : (
          charactersToDisplay.map((character) => (
            <div className={styles.charElem} key={character.id}>
              <Link to={`./${character.id}`}>
                <img src={character.image} alt={character.name} />
                <div className={styles.title}>
                  <h3>{character.name}</h3>
                </div>
              </Link>
              {showingFavorites ? (
                <div
                  onClick={() => removeFromFavorites(character.id)}
                  className={styles.favoriteButton}
                  role="button"
                  aria-label={`Remove ${character.name} from favorites`}
                >
                  REMOVE
                </div>
              ) : (
                <div
                  onClick={() => addToFavorites(character.id)}
                  className={styles.favoriteButton}
                  role="button"
                  aria-label={`Add ${character.name} to favorites`}
                >
                  {favoriteCharacters.some((char) => char.id === character.id)
                    ? "ADDED"
                    : "ADD"}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <Link to="/">
        <button className={styles.goBackButton}>Go Back</button>
      </Link>
    </section>
  );
}
