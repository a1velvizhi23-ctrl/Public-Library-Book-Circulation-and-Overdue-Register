/**
 * Application constants for the Library Circulation System.
 * Centralizes all magic strings, statuses, and configuration values.
 */

export const STATUSES = {
  ALL: 'All',
  ISSUED: 'Issued',
  RETURNED: 'Returned',
  OVERDUE: 'Overdue',
};

export const STATUS_COLORS = {
  [STATUSES.ISSUED]: 'var(--color-primary)',
  [STATUSES.RETURNED]: 'var(--color-success)',
  [STATUSES.OVERDUE]: 'var(--color-danger)',
};

export const STATUS_LABELS = {
  [STATUSES.ISSUED]: 'Issued',
  [STATUSES.RETURNED]: 'Returned',
  [STATUSES.OVERDUE]: 'Overdue',
};

export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  ALPHABETICAL: 'alphabetical',
};

export const SORT_LABELS = {
  [SORT_OPTIONS.NEWEST]: 'Newest First',
  [SORT_OPTIONS.OLDEST]: 'Oldest First',
  [SORT_OPTIONS.ALPHABETICAL]: 'Alphabetical',
};

export const ITEMS_PER_PAGE = 10;

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  STORAGE_KEY: 'library-theme',
};

export const EXPORT = {
  JSON_FILENAME: 'library-records.json',
  CSV_FILENAME: 'library-records.csv',
  CSV_HEADERS: ['Issue ID', 'Book ID', 'Title', 'Member', 'Issue Date', 'Due Date', 'Return Date', 'Status'],
};

export const MESSAGES = {
  LOADING: 'Loading...',
  NO_RESULTS: 'No records found',
  NO_RESULTS_DESC: 'No book circulation records match your current search or filter criteria. Try adjusting your filters or search terms.',
  ERROR_TITLE: 'Something went wrong',
  ERROR_DESC: 'An error occurred while loading the data. Please check your connection and try again.',
  NOT_FOUND_TITLE: 'Page Not Found',
  NOT_FOUND_DESC: 'The page you are looking for does not exist or has been moved.',
  RECORD_NOT_FOUND: 'Record not found',
  RECORD_NOT_FOUND_DESC: (id) => `No record found with Issue ID "${id}". It may have been removed or the ID is incorrect.`,
};

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 350,
};

export const DEBOUNCE_DELAY = 300;

export const LOADING_DELAY = 600;
export const ERROR_CHECK_DELAY = 600;