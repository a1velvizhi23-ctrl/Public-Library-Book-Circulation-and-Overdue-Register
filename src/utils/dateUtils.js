/**
 * Date utility functions for the Library Circulation system.
 * Handles date formatting, overdue calculations, and date differences.
 */

/**
 * Calculate the number of overdue days for a book record.
 * For returned books: max(return_date - due_date, 0)
 * For issued/overdue books: today - due_date
 * Never returns a negative value.
 *
 * @param {string} dueDate - The due date in YYYY-MM-DD format
 * @param {string|null} returnDate - The return date in YYYY-MM-DD format, or null if not returned
 * @param {string} status - The status of the record ('Returned', 'Issued', 'Overdue')
 * @returns {number} The number of overdue days
 */
export function calculateOverdue(dueDate, returnDate, status) {
  const due = new Date(dueDate);
  let end;

  if (status === 'Returned' && returnDate) {
    end = new Date(returnDate);
  } else {
    end = new Date();
  }

  const diffTime = end.getTime() - due.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

/**
 * Format a date string into a human-readable format.
 * @param {string} dateStr - The date string in YYYY-MM-DD format
 * @returns {string} Formatted date (e.g., "Jan 15, 2026")
 */
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Calculate the number of days between two dates.
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {number} Number of days between the two dates
 */
export function daysBetween(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get today's date as a string in YYYY-MM-DD format.
 * @returns {string} Today's date
 */
export function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}