import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "../css/header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
function Header() {
  const [isLightMode, setIsLightMode] = useState(false);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = !isLightMode;
    setIsLightMode(newTheme);
    document.documentElement.classList.toggle("light-mode", newTheme);
    document.documentElement.classList.toggle("dark-mode", !newTheme); // Optional if you use the class
    localStorage.setItem("theme", newTheme ? "light" : "dark"); // Save preference
  };

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const isLight = savedTheme === "light";
      setIsLightMode(isLight);
      document.documentElement.classList.toggle("light-mode", isLight);
    }
  }, []);
  return (
    <header className={styles.header}>
      <div></div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/characters"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/episodes"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Episodes
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon
          onClick={toggleTheme}
          className={styles.icon}
          icon={isLightMode ? faSun : faMoon}
        />
      </div>
    </header>
  );
}

export default Header;
