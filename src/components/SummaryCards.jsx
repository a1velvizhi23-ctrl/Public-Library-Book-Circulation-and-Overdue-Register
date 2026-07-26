import { FiBook, FiBookOpen, FiBookmark, FiAlertTriangle, FiUsers, FiClock, FiTrendingUp } from 'react-icons/fi';
import AnimatedCounter from './AnimatedCounter';
import styles from './SummaryCards.module.css';

/**
 * SummaryCards component displaying key statistics in card format with animated counters.
 * @param {Object} props
 * @param {Object} props.stats - Statistics object from statsUtils.calculateSummary()
 */
export default function SummaryCards({ stats }) {
  if (!stats) return null;

  const cards = [
    {
      label: 'Total Books',
      value: stats.totalBooks,
      icon: <FiBook />,
      colorClass: 'cardBlue',
      iconClass: 'iconBlue',
      subtext: `${stats.borrowPercentage}% issued`,
    },
    {
      label: 'Books Issued',
      value: stats.booksIssued,
      icon: <FiBookOpen />,
      colorClass: 'cardOrange',
      iconClass: 'iconOrange',
      subtext: 'Currently borrowed',
    },
    {
      label: 'Books Returned',
      value: stats.booksReturned,
      icon: <FiBookmark />,
      colorClass: 'cardGreen',
      iconClass: 'iconGreen',
      subtext: `${stats.returnPercentage}% of total`,
    },
    {
      label: 'Overdue Books',
      value: stats.overdueBooks,
      icon: <FiAlertTriangle />,
      colorClass: 'cardRed',
      iconClass: 'iconRed',
      subtext: `${stats.totalOverdueDays} total overdue days`,
    },
    {
      label: 'Total Members',
      value: stats.uniqueMembers,
      icon: <FiUsers />,
      colorClass: 'cardNavy',
      iconClass: 'iconNavy',
      subtext: 'Unique library members',
    },
    {
      label: 'Avg Borrow Days',
      value: stats.avgBorrowDays,
      icon: <FiClock />,
      colorClass: 'cardPurple',
      iconClass: 'iconPurple',
      subtext: 'Average per borrowed book',
    },
    {
      label: 'Most Borrowed',
      value: stats.mostBorrowed?.count || 0,
      icon: <FiTrendingUp />,
      colorClass: 'cardCyan',
      iconClass: 'iconCyan',
      subtext: stats.mostBorrowed?.title || 'N/A',
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card, index) => (
        <div
          key={card.label}
          className={`${styles.card} ${styles[card.colorClass]}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>{card.label}</span>
            <div className={`${styles.cardIcon} ${styles[card.iconClass]}`}>
              {card.icon}
            </div>
          </div>
          <div className={styles.cardValue}>
            <AnimatedCounter value={card.value} />
          </div>
          <div className={styles.cardSubtext}>{card.subtext}</div>
        </div>
      ))}
    </div>
  );
}