/**
 * Filter utility functions for searching, filtering, and sorting book records.
 */

/**
 * Filter books by their status.
 * @param {Array} books - Array of book records
 * @param {string} status - Status to filter by ('Issued', 'Returned', 'Overdue', or 'All')
 * @returns {Array} Filtered array of books
 */
export function filterBooks(books, status) {
  if (!status || status === 'All') return books;
  return books.filter((book) => book.status === status);
}

/**
 * Search books by title, book ID, issue ID, or member name.
 * Case-insensitive search.
 * @param {Array} books - Array of book records
 * @param {string} query - Search query string
 * @returns {Array} Filtered array of matching books
 */
export function searchBooks(books, query) {
  if (!query || query.trim() === '') return books;
  const lowerQuery = query.toLowerCase().trim();
  return books.filter(
    (book) =>
      (book.title && book.title.toLowerCase().includes(lowerQuery)) ||
      (book.book_id && book.book_id.toLowerCase().includes(lowerQuery)) ||
      (book.issue_id && book.issue_id.toLowerCase().includes(lowerQuery)) ||
      (book.member_name && book.member_name.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Sort books by a given criterion.
 * @param {Array} books - Array of book records
 * @param {string} sortBy - Sort criterion ('newest', 'oldest', 'alphabetical')
 * @returns {Array} Sorted array of books
 */
export function sortBooks(books, sortBy) {
  const sorted = [...books];
  switch (sortBy) {
    case 'newest':
      return sorted.sort(
        (a, b) => new Date(b.issue_date) - new Date(a.issue_date)
      );
    case 'oldest':
      return sorted.sort(
        (a, b) => new Date(a.issue_date) - new Date(b.issue_date)
      );
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}

/**
 * Get unique values for a given field from the books array.
 * @param {Array} books - Array of book records
 * @param {string} field - Field name to extract unique values from
 * @returns {Array} Array of unique values
 */
export function getUniqueValues(books, field) {
  const values = books.map((book) => book[field]).filter(Boolean);
  return [...new Set(values)];
}