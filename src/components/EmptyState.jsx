import { FiInbox } from 'react-icons/fi';
import styles from './EmptyState.module.css';

/**
 * EmptyState component displayed when no records match the current filters.
 * @param {Object} props
 * @param {string} props.title - Optional custom title
 * @param {string} props.message - Optional custom message
 */
export default function EmptyState({
  title = 'No records found',
  message = 'No book circulation records match your current search or filter criteria. Try adjusting your filters or search terms.',
}) {
  return (
    <div className={styles.wrapper} role="status">
      <div className={styles.icon} aria-hidden="true">
        <FiInbox />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
    </div>
  );
}