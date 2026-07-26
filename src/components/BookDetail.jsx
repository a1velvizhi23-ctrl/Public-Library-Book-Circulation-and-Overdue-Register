import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import { calculateOverdue, formatDate } from '../utils/dateUtils';
import styles from './BookDetail.module.css';

/**
 * BookDetail component showing full record information, status, overdue, and timeline.
 * @param {Object} props
 * @param {Object} props.book - Book record object
 */
export default function BookDetail({ book }) {
  if (!book) return null;

  const overdue = calculateOverdue(book.due_date, book.return_date, book.status);

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

  const getDotClass = (type) => {
    switch (type) {
      case 'issue':
        return styles.dotPrimary;
      case 'due':
        return styles.dotDanger;
      case 'return':
        return styles.dotSuccess;
      default:
        return styles.dotPrimary;
    }
  };

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        <FiArrowLeft aria-hidden="true" />
        <span>Back to Dashboard</span>
      </Link>

      {/* Top Section: Status + Overdue */}
      <div className={styles.topSection}>
        <div className={styles.statusCard}>
          <span className={`${styles.statusBadgeLarge} ${getStatusClass(book.status)}`}>
            {book.status === 'Returned' && <FiCheckCircle aria-hidden="true" />}
            {book.status === 'Issued' && <FiClock aria-hidden="true" />}
            {book.status === 'Overdue' && <FiXCircle aria-hidden="true" />}
            {book.status}
          </span>
          <div
            className={`${styles.overdueNumber} ${overdue > 0 ? styles.overdueText : styles.safeText}`}
          >
            {overdue}
          </div>
          <div className={styles.overdueLabel}>
            {overdue > 0 ? 'Days Overdue' : 'Days Overdue (None)'}
          </div>
        </div>

        {/* Book Information */}
        <div className={styles.infoCard}>
          <h3 className={styles.infoCardTitle}>Book Information</h3>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Issue ID</span>
            <span className={styles.infoValue}>
              <code>{book.issue_id}</code>
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Book ID</span>
            <span className={styles.infoValue}>
              <code>{book.book_id}</code>
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Title</span>
            <span className={styles.infoValue} style={{ fontWeight: 600 }}>
              {book.title}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Member</span>
            <span className={styles.infoValue}>{book.member_name}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Issue Date</span>
            <span className={styles.infoValue}>{formatDate(book.issue_date)}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Due Date</span>
            <span className={styles.infoValue}>{formatDate(book.due_date)}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Return Date</span>
            <span className={styles.infoValue}>
              {book.return_date ? formatDate(book.return_date) : 'Not returned yet'}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Overdue Days</span>
            <span
              className={styles.infoValue}
              style={{ color: overdue > 0 ? 'var(--color-danger)' : 'var(--color-success)', fontWeight: 700 }}
            >
              {overdue > 0 ? `${overdue} days` : 'None'}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className={styles.timeline}>
        <h3 className={styles.timelineTitle}>
          <FiCalendar aria-hidden="true" style={{ marginRight: 6 }} />
          Issue Timeline
        </h3>
        <div className={styles.timelineSteps}>
          <div className={styles.timelineStep}>
            <div className={`${styles.timelineDot} ${getDotClass('issue')}`}>
              <FiCalendar aria-hidden="true" />
            </div>
            <div>
              <div className={styles.timelineDate}>{formatDate(book.issue_date)}</div>
              <div className={styles.timelineLabel}>Issue Date</div>
            </div>
          </div>
          <div className={styles.timelineStep}>
            <div className={`${styles.timelineDot} ${getDotClass('due')}`}>
              <FiXCircle aria-hidden="true" />
            </div>
            <div>
              <div className={styles.timelineDate}>{formatDate(book.due_date)}</div>
              <div className={styles.timelineLabel}>Due Date</div>
            </div>
          </div>
          <div className={styles.timelineStep}>
            <div className={`${styles.timelineDot} ${getDotClass('return')}`}>
              <FiCheckCircle aria-hidden="true" />
            </div>
            <div>
              <div className={styles.timelineDate}>
                {book.return_date ? formatDate(book.return_date) : '—'}
              </div>
              <div className={styles.timelineLabel}>Return Date</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}