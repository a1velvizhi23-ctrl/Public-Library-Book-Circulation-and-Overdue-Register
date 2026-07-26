import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiBook, FiHome, FiBarChart2, FiSun, FiMoon, FiGithub, FiMenu, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';

/**
 * Navbar component with responsive navigation, theme toggle, and mobile menu.
 */
export default function Navbar({ theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
        <Link to="/" className={styles.brand} aria-label="Library Dashboard Home">
          <div className={styles.logo} aria-hidden="true">
            <FiBook />
          </div>
          <span className={styles.brandName}>Library Book Circulation</span>
        </Link>

        <div className={styles.navLinks}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            aria-label="Dashboard"
          >
            <FiHome aria-hidden="true" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/statistics"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            aria-label="Statistics"
          >
            <FiBarChart2 aria-hidden="true" />
            <span>Statistics</span>
          </NavLink>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </button>
          <a
            href="https://github.com/a1velvizhi23-ctrl"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            aria-label="GitHub repository"
            title="GitHub"
          >
            <FiGithub aria-hidden="true" />
          </a>
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`} aria-hidden={!mobileOpen}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
        >
          <FiHome aria-hidden="true" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/statistics"
          className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
        >
          <FiBarChart2 aria-hidden="true" />
          <span>Statistics</span>
        </NavLink>
        <div className={styles.mobileShortcuts}>
          <span className={styles.shortcutHint}><kbd>Ctrl+J</kbd> Export JSON</span>
          <span className={styles.shortcutHint}><kbd>Ctrl+C</kbd> Export CSV</span>
          <span className={styles.shortcutHint}><kbd>Ctrl+P</kbd> Print</span>
        </div>
      </div>
    </>
  );
}
