/**
 * Statistics utility functions for computing dashboard summary data.
 */
import { calculateOverdue, daysBetween } from './dateUtils';

/**
 * Calculate summary statistics from the books array.
 * @param {Array} books - Array of book records
 * @returns {Object} Summary statistics object
 */
export function calculateSummary(books) {
  const totalBooks = books.length;
  const booksIssued = books.filter((b) => b.status === 'Issued').length;
  const booksReturned = books.filter((b) => b.status === 'Returned').length;
  const overdueBooks = books.filter((b) => b.status === 'Overdue').length;

  // Unique members count
  const uniqueMembers = new Set(books.map((b) => b.member_name).filter(Boolean))
    .size;

  // Average borrow days (for returned books)
  const returnedBooks = books.filter(
    (b) => b.status === 'Returned' && b.return_date
  );
  const totalBorrowDays = returnedBooks.reduce((sum, b) => {
    return sum + daysBetween(b.issue_date, b.return_date);
  }, 0);
  const avgBorrowDays =
    returnedBooks.length > 0
      ? Math.round((totalBorrowDays / returnedBooks.length) * 10) / 10
      : 0;

  // Most borrowed book
  const mostBorrowed = getMostBorrowed(books);

  // Most active member
  const mostActive = getMostActiveMember(books);

  // Total overdue days
  const totalOverdueDays = books.reduce((sum, b) => {
    return sum + calculateOverdue(b.due_date, b.return_date, b.status);
  }, 0);

  // Percentages
  const borrowPercentage =
    totalBooks > 0 ? Math.round((booksIssued / totalBooks) * 100) : 0;
  const returnPercentage =
    totalBooks > 0 ? Math.round((booksReturned / totalBooks) * 100) : 0;

  return {
    totalBooks,
    booksIssued,
    booksReturned,
    overdueBooks,
    uniqueMembers,
    avgBorrowDays,
    mostBorrowed,
    mostActive,
    totalOverdueDays,
    borrowPercentage,
    returnPercentage,
  };
}

/**
 * Find the most borrowed book (highest issue count by title).
 * @param {Array} books - Array of book records
 * @returns {Object} Most borrowed book info
 */
export function getMostBorrowed(books) {
  const countMap = {};
  books.forEach((b) => {
    if (b.title) {
      countMap[b.title] = (countMap[b.title] || 0) + 1;
    }
  });

  let maxCount = 0;
  let mostBorrowedTitle = '';
  for (const [title, count] of Object.entries(countMap)) {
    if (count > maxCount) {
      maxCount = count;
      mostBorrowedTitle = title;
    }
  }

  return mostBorrowedTitle
    ? { title: mostBorrowedTitle, count: maxCount }
    : { title: 'N/A', count: 0 };
}

/**
 * Find the most active member (highest borrow count).
 * @param {Array} books - Array of book records
 * @returns {Object} Most active member info
 */
export function getMostActiveMember(books) {
  const countMap = {};
  books.forEach((b) => {
    if (b.member_name) {
      countMap[b.member_name] = (countMap[b.member_name] || 0) + 1;
    }
  });

  let maxCount = 0;
  let mostActiveName = '';
  for (const [name, count] of Object.entries(countMap)) {
    if (count > maxCount) {
      maxCount = count;
      mostActiveName = name;
    }
  }

  return mostActiveName
    ? { name: mostActiveName, count: maxCount }
    : { name: 'N/A', count: 0 };
}

/**
 * Get monthly borrow trend data for charts.
 * @param {Array} books - Array of book records
 * @returns {Array} Array of monthly data points
 */
export function getMonthlyTrend(books) {
  const monthMap = {};

  books.forEach((b) => {
    if (b.issue_date) {
      const month = b.issue_date.substring(0, 7); // YYYY-MM
      if (!monthMap[month]) {
        monthMap[month] = { month, issued: 0, returned: 0, overdue: 0 };
      }
      monthMap[month].issued += 1;
      if (b.status === 'Returned') monthMap[month].returned += 1;
      if (b.status === 'Overdue') monthMap[month].overdue += 1;
    }
  });

  return Object.values(monthMap).sort((a, b) => a.month.localeCompare(b.month));
}

/**
 * Get status distribution data for pie chart.
 * @param {Array} books - Array of book records
 * @returns {Array} Array of status distribution objects
 */
export function getStatusDistribution(books) {
  const issued = books.filter((b) => b.status === 'Issued').length;
  const returned = books.filter((b) => b.status === 'Returned').length;
  const overdue = books.filter((b) => b.status === 'Overdue').length;

  return [
    { name: 'Issued', value: issued, color: '#2196F3' },
    { name: 'Returned', value: returned, color: '#4CAF50' },
    { name: 'Overdue', value: overdue, color: '#F44336' },
  ];
}

/**
 * Get top borrowed books for chart display.
 * @param {Array} books - Array of book records
 * @param {number} limit - Maximum number of books to return
 * @returns {Array} Array of top books with borrow counts
 */
export function getTopBorrowedBooks(books, limit = 7) {
  const countMap = {};
  books.forEach((b) => {
    if (b.title) {
      countMap[b.title] = (countMap[b.title] || 0) + 1;
    }
  });

  return Object.entries(countMap)
    .map(([title, count]) => ({ title, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}