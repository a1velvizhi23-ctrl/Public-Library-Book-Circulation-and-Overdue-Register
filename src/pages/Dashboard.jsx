import { useState, useMemo, useCallback, useEffect } from 'react';
import { FiDownload, FiPrinter } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import StatusFilter from '../components/StatusFilter';
import SummaryCards from '../components/SummaryCards';
import BookTable from '../components/BookTable';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { filterBooks, searchBooks, sortBooks } from '../utils/filterUtils';
import { calculateSummary } from '../utils/statsUtils';
import usePageTitle from '../hooks/usePageTitle';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import { showToast } from '../components/Toast';
import { ITEMS_PER_PAGE, LOADING_DELAY, MESSAGES } from '../utils/constants';
import booksData from '../data/books.json';
import styles from './Dashboard.module.css';

/**
 * Dashboard page - main view with summary cards, search, filters, table, and pagination.
 */
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  usePageTitle('Dashboard');

  // Simulate loading state on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (!booksData || !Array.isArray(booksData)) {
          throw new Error('Invalid data format');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }, LOADING_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // Computed filtered & sorted books
  const processedBooks = useMemo(() => {
    let result = [...booksData];
    result = filterBooks(result, statusFilter);
    result = searchBooks(result, searchQuery);
    result = sortBooks(result, sortBy);
    return result;
  }, [searchQuery, statusFilter, sortBy]);

  // Stats
  const stats = useMemo(() => calculateSummary(booksData), []);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(processedBooks.length / ITEMS_PER_PAGE));
  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedBooks.slice(start, start + ITEMS_PER_PAGE);
  }, [processedBooks, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortBy]);

  // Export functions
  const exportJSON = useCallback(() => {
    try {
      const blob = new Blob([JSON.stringify(processedBooks, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'library-records.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('JSON export completed successfully', 'success');
    } catch {
      showToast('Failed to export JSON', 'error');
    }
  }, [processedBooks]);

  const exportCSV = useCallback(() => {
    try {
      const headers = ['Issue ID', 'Book ID', 'Title', 'Member', 'Issue Date', 'Due Date', 'Return Date', 'Status'];
      const rows = processedBooks.map((b) =>
        [b.issue_id, b.book_id, `"${b.title}"`, b.member_name, b.issue_date, b.due_date, b.return_date || '', b.status].join(',')
      );
      const csv = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'library-records.csv';
      a.click();
      URL.revokeObjectURL(url);
      showToast('CSV export completed successfully', 'success');
    } catch {
      showToast('Failed to export CSV', 'error');
    }
  }, [processedBooks]);

  const printReport = useCallback(() => {
    window.print();
  }, []);

  // Retry handler
  const handleRetry = useCallback(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        if (!booksData || !Array.isArray(booksData)) {
          throw new Error('Invalid data format');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }, LOADING_DELAY);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'ctrl+j': () => exportJSON(),
    'ctrl+c': () => exportCSV(),
    'ctrl+p': () => printReport(),
  });

  if (error) {
    return <ErrorState message={error} onRetry={handleRetry} />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Library Dashboard</h1>
        <p className={styles.subtitle}>Monitor book circulation, overdue items, and borrowing statistics</p>
      </div>

      {loading ? (
        <Loading type="all" />
      ) : (
        <>
          <SummaryCards stats={stats} />

          <div className={styles.controls}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} books={booksData} />
            <StatusFilter
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          <div className={styles.resultsInfo}>
            <span className={styles.resultCount}>
              Showing <strong>{processedBooks.length}</strong> result{processedBooks.length !== 1 ? 's' : ''}
              {searchQuery && <span> for "<strong>{searchQuery}</strong>"</span>}
            </span>
            <div className={styles.exportBtns}>
              <button className={styles.exportBtn} onClick={exportJSON} aria-label="Export as JSON (Ctrl+J)">
                <FiDownload aria-hidden="true" />
                <span>JSON</span>
              </button>
              <button className={styles.exportBtn} onClick={exportCSV} aria-label="Export as CSV (Ctrl+C)">
                <FiDownload aria-hidden="true" />
                <span>CSV</span>
              </button>
              <button className={styles.exportBtn} onClick={printReport} aria-label="Print report (Ctrl+P)">
                <FiPrinter aria-hidden="true" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {processedBooks.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <BookTable books={paginatedBooks} />
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </>
          )}
        </>
      )}
    </div>
  );
}