import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import styles from './ErrorState.module.css';

/**
 * ErrorState component displayed when data fails to load.
 * @param {Object} props
 * @param {string} props.title - Optional custom title
 * @param {string} props.message - Optional custom message
 * @param {Function} props.onRetry - Retry callback function
 */
export default function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading the data. Please check your connection and try again.',
  onRetry,
}) {
  return (
    <div className={styles.wrapper} role="alert">
      <div className={styles.icon} aria-hidden="true">
        <FiAlertCircle />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry} aria-label="Retry loading data">
          <FiRefreshCw aria-hidden="true" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}