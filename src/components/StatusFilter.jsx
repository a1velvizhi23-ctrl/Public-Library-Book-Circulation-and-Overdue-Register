import { FiFilter, FiCalendar } from 'react-icons/fi';
import styles from './StatusFilter.module.css';

/**
 * StatusFilter component with status buttons, sort dropdown, and date range inputs.
 * @param {Object} props
 * @param {string} props.statusFilter - Current status filter
 * @param {Function} props.onStatusChange - Status change handler
 * @param {string} props.sortBy - Current sort option
 * @param {Function} props.onSortChange - Sort change handler
 */
export default function StatusFilter({
  statusFilter = 'All',
  onStatusChange,
  sortBy = 'newest',
  onSortChange,
}) {
  const statuses = [
    { value: 'All', label: 'All', color: null },
    { value: 'Issued', label: 'Issued', color: 'var(--color-primary)' },
    { value: 'Returned', label: 'Returned', color: 'var(--color-success)' },
    { value: 'Overdue', label: 'Overdue', color: 'var(--color-danger)' },
  ];

  return (
    <div className={styles.filterBar} role="group" aria-label="Filters">
      <div className={styles.filterGroup}>
        <FiFilter aria-hidden="true" style={{ marginLeft: '8px', color: 'var(--color-text-muted)' }} />
        {statuses.map((s) => (
          <button
            key={s.value}
            className={`${styles.filterBtn} ${statusFilter === s.value ? styles.active : ''}`}
            onClick={() => onStatusChange(s.value)}
            aria-pressed={statusFilter === s.value}
            aria-label={`Filter by ${s.label}`}
          >
            {s.color && (
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: s.color,
                  display: 'inline-block',
                }}
                aria-hidden="true"
              />
            )}
            {s.label}
          </button>
        ))}
      </div>

      <select
        className={styles.sortSelect}
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort books"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>
  );
}