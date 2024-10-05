import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../css/header.module.css";

function Header() {
  return (
    <header className={styles.header}>
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
    </header>
  );
}

export default Header;
