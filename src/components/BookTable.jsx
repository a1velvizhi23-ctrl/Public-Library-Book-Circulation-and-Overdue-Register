import { Link } from 'react-router-dom';
import { FiEye, FiArrowRight } from 'react-icons/fi';
import { calculateOverdue, formatDate } from '../utils/dateUtils';
import styles from './BookTable.module.css';

/**
 * BookTable component with desktop table and mobile card views.
 * @param {Object} props
 * @param {Array} props.books - Array of book records to display
 */
export default function BookTable({ books }) {
  if (!books || books.length === 0) return null;

  const getStatusClass = (status) => {
    switch (status) {
      case 'Returned':
        return styles.statusReturned;
      case 'Issued':
        return styles.statusIssued;
      case 'Overdue':
        return styles.statusOverdue;
      default:
        return '';
    }
  };

  return (
    <div className={styles.tableContainer}>
      {/* Desktop Table View */}
      <div className={styles.tableWrapper}>
        <table className={styles.table} role="table" aria-label="Book circulation records">
          <thead>
            <tr>
              <th scope="col">Issue ID</th>
              <th scope="col">Book ID</th>
              <th scope="col">Title</th>
              <th scope="col">Member</th>
              <th scope="col">Issue Date</th>
              <th scope="col">Due Date</th>
              <th scope="col">Return Date</th>
              <th scope="col">Status</th>
              <th scope="col">Overdue</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              const overdue = calculateOverdue(book.due_date, book.return_date, book.status);
              return (
                <tr key={book.issue_id}>
                  <td>
                    <code style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                      {book.issue_id}
                    </code>
                  </td>
                  <td>
                    <code style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                      {book.book_id}
                    </code>
                  </td>
                  <td style={{ fontWeight: 500 }}>{book.title}</td>
                  <td>{book.member_name}</td>
                  <td>{formatDate(book.issue_date)}</td>
                  <td>{formatDate(book.due_date)}</td>
                  <td>{formatDate(book.return_date)}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusClass(book.status)}`}>
                      {book.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`${styles.overdueDays} ${overdue > 0 ? styles.overdue : styles.safe}`}
                    >
                      {overdue > 0 ? `${overdue}d` : '—'}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/book/${book.issue_id}`}
                      className={styles.viewBtn}
                      aria-label={`View details for ${book.title}`}
                    >
                      <FiEye aria-hidden="true" />
                      <span>View</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className={styles.mobileCards}>
        {books.map((book) => {
          const overdue = calculateOverdue(book.due_date, book.return_date, book.status);
          return (
            <div key={book.issue_id} className={styles.mobileCard}>
              <div className={styles.mobileCardRow}>
                <span className={styles.mobileCardLabel}>Title</span>
                <span className={styles.mobileCardValue} style={{ fontWeight: 600 }}>
                  {book.title}
                </span>
              </div>
              <div className={styles.mobileCardRow}>
                <span className={styles.mobileCardLabel}>Issue ID</span>
                <span className={styles.mobileCardValue}>
                  <code>{book.issue_id}</code>
                </span>
              </div>
              <div className={styles.mobileCardRow}>
                <span className={styles.mobileCardLabel}>Member</span>
                <span className={styles.mobileCardValue}>{book.member_name}</span>
              </div>
              <div className={styles.mobileCardRow}>
                <span className={styles.mobileCardLabel}>Status</span>
                <span className={`${styles.statusBadge} ${getStatusClass(book.status)}`}>
                  {book.status}
                </span>
              </div>
              <div className={styles.mobileCardRow}>
                <span className={styles.mobileCardLabel}>Overdue</span>
                <span
                  className={`${styles.overdueDays} ${overdue > 0 ? styles.overdue : styles.safe}`}
                >
                  {overdue > 0 ? `${overdue} days` : 'None'}
                </span>
              </div>
              <div className={styles.mobileCardRow}>
                <span className={styles.mobileCardLabel}>Due Date</span>
                <span className={styles.mobileCardValue}>{formatDate(book.due_date)}</span>
              </div>
              <div className={styles.mobileCardActions}>
                <Link
                  to={`/book/${book.issue_id}`}
                  className={styles.viewBtn}
                  aria-label={`View details for ${book.title}`}
                >
                  <span>View Details</span>
                  <FiArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}