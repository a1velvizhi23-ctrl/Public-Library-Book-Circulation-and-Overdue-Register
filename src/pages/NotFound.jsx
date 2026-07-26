import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import usePageTitle from '../hooks/usePageTitle';
import { MESSAGES } from '../utils/constants';

/**
 * NotFound page - 404 error page.
 */
export default function NotFound() {
  usePageTitle('Page Not Found');

  return (
    <div style={{ textAlign: 'center', paddingTop: '4rem', animation: 'fadeIn var(--transition-slow) ease' }}>
      <h1
        style={{
          fontSize: '5rem',
          fontWeight: 800,
          color: 'var(--color-primary)',
          marginBottom: '0.5rem',
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
        {MESSAGES.NOT_FOUND_TITLE}
      </h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', maxWidth: 400, margin: '0 auto 2rem' }}>
        {MESSAGES.NOT_FOUND_DESC}
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-primary)',
          color: 'var(--color-white)',
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'all var(--transition-fast)',
        }}
        className="not-found-link"
      >
        <FiHome aria-hidden="true" />
        <span>Back to Dashboard</span>
      </Link>
    </div>
  );
}