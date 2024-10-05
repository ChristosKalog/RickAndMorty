import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVenus,
  faMars,
  faGenderless,
  faTrash,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import FilterButton from "./FilterButton";
import styles from "../css/characterfilters.module.css";

export default function CharacterFilters({
  handleRenderCountChange,
  handleCustomRender,
  handleInputChange,
  handleSearchChange,
  renderAlive,
  renderDead,
  renderWomen,
  renderMen,
  renderGenderless,
  renderClear,
  showFavorites,
  clearFavorites,
  alivePressed,
  deadPressed,
  womenPressed,
  menPressed,
  genderlessPressed,
  showingFavorites,
  favoriteCharacters,
  characterCount,
  searchQuery,
}) {
  const [isFiltersOn, setIsFilterOn] = useState(true);
  const showFilterToggle = () => {
    setIsFilterOn(!isFiltersOn);
  };

  return (
    <>
     
      <button className={styles.showFiltersButton} onClick={showFilterToggle}>
        <div className={styles.filterTextContainer}>
          <span>{isFiltersOn ? "Hide" : "Show"} Filters</span>
          <FontAwesomeIcon
            icon={isFiltersOn ? faEyeSlash : faEye}
            className={styles.iconMargin}
          />
        </div>
      </button>

      {isFiltersOn ? (
        <div className={styles.buttonHeader}>
          <div className={styles.renderOptions}>
            <FilterButton
              onClick={() => handleRenderCountChange(1)}
              ariaLabel="Get 1 Random Character"
              isPressed={true}
              filter={false}
            >
              Get 1 Random
            </FilterButton>
            <FilterButton
              onClick={() => handleRenderCountChange(10)}
              ariaLabel="Get 10 Random Characters"
              isPressed={true}
              filter={false}
            >
              Get 10 Random
            </FilterButton>
            <FilterButton
              onClick={handleCustomRender}
              ariaLabel="Render Custom Number of Characters"
              isPressed={true}
              filter={false}
            >
              Render Custom
            </FilterButton>
            <input
              className={styles.characterCount}
              type="number"
              id="characterCount"
              name="characterCount"
              min="0"
              onChange={handleInputChange}
              value={characterCount}
              aria-label="Number of characters to render"
            />
            <input
              className={styles.searchBar}
              type="text"
              placeholder="Search characters..."
              onChange={handleSearchChange}
              value={searchQuery}
              aria-label="Search characters"
            />
          </div>
          <div className={styles.renderOptions}>
            <FilterButton
              onClick={renderAlive}
              isPressed={alivePressed}
              ariaLabel="Show alive characters"
              filter={true}
            >
              Alive
            </FilterButton>
            <FilterButton
              onClick={renderDead}
              isPressed={deadPressed}
              ariaLabel="Show dead characters"
              filter={true}
            >
              Dead
            </FilterButton>
            <FilterButton
              onClick={renderWomen}
              isPressed={womenPressed}
              ariaLabel="Show female characters"
              filter={true}
            >
              <FontAwesomeIcon icon={faVenus} />
            </FilterButton>
            <FilterButton
              onClick={renderMen}
              isPressed={menPressed}
              ariaLabel="Show male characters"
              filter={true}
            >
              <FontAwesomeIcon icon={faMars} />
            </FilterButton>
            <FilterButton
              onClick={renderGenderless}
              isPressed={genderlessPressed}
              ariaLabel="Show genderless characters"
              filter={true}
            >
              <FontAwesomeIcon icon={faGenderless} />
            </FilterButton>
            <FilterButton
              onClick={showFavorites}
              ariaLabel="Toggle favorite characters"
              isPressed={true}
              filter={true}
            >
              {showingFavorites ? "Hide Favorites" : "Show Favorites"}
            </FilterButton>

            <p
              onClick={renderClear}
              tabIndex="0"
              role="button"
              aria-label="Clear all filters"
            >
              Clear Filters
            </p>
          </div>

          {showingFavorites && favoriteCharacters.length > 0 && (
            <div className={styles.favoriteButtonContainer}>
              <button
                className={styles.clearButton}
                onClick={clearFavorites}
                aria-label="Delete all favorites"
              >
                <FontAwesomeIcon icon={faTrash} />
                <p>Delete Favorites</p>
              </button>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
