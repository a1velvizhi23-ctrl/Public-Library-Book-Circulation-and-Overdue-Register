import { useState, useEffect, useMemo, useCallback } from 'react';
import SummaryCards from '../components/SummaryCards';
import StatsChart from '../components/StatsChart';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { calculateSummary, getTopBorrowedBooks, getStatusDistribution, getMonthlyTrend, getMostActiveMember } from '../utils/statsUtils';
import usePageTitle from '../hooks/usePageTitle';
import { LOADING_DELAY } from '../utils/constants';
import booksData from '../data/books.json';
import styles from './Dashboard.module.css';

/**
 * Statistics page - shows summary cards and charts with borrowing analytics.
 */
export default function Statistics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  usePageTitle('Statistics & Analytics');

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

  const stats = useMemo(() => calculateSummary(booksData), []);
  const topBooks = useMemo(() => getTopBorrowedBooks(booksData, 7), []);
  const statusDistribution = useMemo(() => getStatusDistribution(booksData), []);
  const monthlyTrend = useMemo(() => getMonthlyTrend(booksData), []);
  const mostActiveMember = useMemo(() => getMostActiveMember(booksData), []);

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

  if (error) return <ErrorState message={error} onRetry={handleRetry} />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Statistics & Analytics</h1>
        <p className={styles.subtitle}>Visual insights into library borrowing patterns and trends</p>
      </div>

      {loading ? (
        <Loading type="all" />
      ) : (
        <>
          <SummaryCards stats={stats} />
          <div style={{ marginTop: 'var(--space-lg)' }}>
            <StatsChart
              topBooks={topBooks}
              statusDistribution={statusDistribution}
              monthlyTrend={monthlyTrend}
              mostActiveMember={mostActiveMember}
            />
          </div>
        </>
      )}
    </div>
  );
}