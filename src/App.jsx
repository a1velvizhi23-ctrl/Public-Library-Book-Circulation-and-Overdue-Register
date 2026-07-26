import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from './components/Toast';
import Loading from './components/Loading';
import { THEME } from './utils/constants';

// Lazy-loaded pages for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const BookDetails = lazy(() => import('./pages/BookDetails'));
const Statistics = lazy(() => import('./pages/Statistics'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * ScrollToTop component that scrolls to top on route change.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

/**
 * Root application component with routing, theme management, and layout.
 */
export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME.STORAGE_KEY);
      return saved || THEME.LIGHT;
    } catch {
      return THEME.LIGHT;
    }
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME.STORAGE_KEY, theme);
    } catch {
      // localStorage may be unavailable
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEME.DARK ? THEME.LIGHT : THEME.DARK));
  };

  return (
    <Router>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main
        id="main-content"
        style={{
          flex: 1,
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
          padding: 'var(--space-lg) var(--space-md)',
        }}
      >
        <Suspense fallback={<Loading type="all" />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/book/:issueId" element={<BookDetails />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  );
}