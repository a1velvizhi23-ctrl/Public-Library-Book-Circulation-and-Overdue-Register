import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import BookDetail from '../components/BookDetail';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import usePageTitle from '../hooks/usePageTitle';
import booksData from '../data/books.json';
import { MESSAGES, LOADING_DELAY } from '../utils/constants';

/**
 * BookDetails page - shows full details of a single book record.
 */
export default function BookDetails() {
  const { issueId } = useParams();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  usePageTitle('Book Details');

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const found = booksData.find((b) => b.issue_id === issueId);
        setBook(found || null);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }, LOADING_DELAY * 0.7);
    return () => clearTimeout(timer);
  }, [issueId]);

  const handleRetry = useCallback(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        const found = booksData.find((b) => b.issue_id === issueId);
        setBook(found || null);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }, LOADING_DELAY * 0.7);
  }, [issueId]);

  if (loading) return <Loading type="table" />;
  if (error) return <ErrorState message={error} onRetry={handleRetry} />;
  if (!book) {
    return (
      <EmptyState
        title={MESSAGES.RECORD_NOT_FOUND}
        message={MESSAGES.RECORD_NOT_FOUND_DESC(issueId)}
      />
    );
  }

  return (
    <div style={{ animation: 'fadeIn var(--transition-slow) ease' }}>
      <BookDetail book={book} />
    </div>
  );
}