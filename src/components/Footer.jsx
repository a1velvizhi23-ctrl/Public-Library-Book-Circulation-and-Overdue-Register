import { FiGithub } from 'react-icons/fi';
import styles from './Footer.module.css';

/**
 * Footer component with copyright and links.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span className={styles.copyright}>
          &copy; {year} Library Circulation System. All rights reserved.
        </span>
        <div className={styles.links}>
          <a
            href="https://github.com/a1velvizhi23-ctrl"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label="GitHub repository"
          >
            <FiGithub aria-hidden="true" style={{ marginRight: 4, verticalAlign: 'middle' }} />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}