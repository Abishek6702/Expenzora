import React from "react";
import { useTheme } from "../context/ThemeContext";
import "./../ToggleTheme.css"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="theme-toggle"
      data-dark-mode={theme === "dark"}
    >
      <div className="switch">
        <div className="insetcover">
        <div className="clouds"></div>
          <div className="sun-moon sun"></div>
          <div className="sun-moon moon"></div>
          <div className="stars"></div>
        </div>
        <div className="shadow-overlay"></div>
      </div>
    </button>
  );
};

export default ThemeToggle;
