import { useEffect } from 'react';

const BASE_TITLE = 'Library Circulation System';

/**
 * Custom hook to set the document page title.
 * @param {string} title - The page title to set
 */
export default function usePageTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${BASE_TITLE}`;
    } else {
      document.title = BASE_TITLE;
    }

    return () => {
      document.title = BASE_TITLE;
    };
  }, [title]);
}