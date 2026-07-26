import { useState, useRef, useEffect, useCallback } from 'react';
import { FiSearch, FiX, FiBook, FiUser, FiHash } from 'react-icons/fi';
import styles from './SearchBar.module.css';

/**
 * SearchBar component with debounced input, clear button, and search suggestions.
 * @param {Object} props
 * @param {string} props.value - Current search value
 * @param {Function} props.onChange - Change handler
 * @param {Array} props.books - Full books array for suggestions
 */
export default function SearchBar({ value, onChange, books = [] }) {
  const [localValue, setLocalValue] = useState(value || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Sync external value
  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  // Debounced search
  const handleChange = useCallback(
    (e) => {
      const val = e.target.value;
      setLocalValue(val);
      setHighlightIndex(-1);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange(val);
      }, 300);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange('');
    inputRef.current?.focus();
    setShowSuggestions(false);
  }, [onChange]);

  // Generate suggestions based on input
  const getSuggestions = () => {
    if (!localValue.trim() || localValue.length < 2) return [];
    const q = localValue.toLowerCase();
    const result = [];

    // Match book titles
    const matchedTitles = books
      .filter((b) => b.title && b.title.toLowerCase().includes(q))
      .slice(0, 3);
    matchedTitles.forEach((b) => {
      if (!result.find((r) => r.text === b.title)) {
        result.push({ type: 'title', text: b.title, icon: <FiBook /> });
      }
    });

    // Match member names
    const matchedMembers = books
      .filter((b) => b.member_name && b.member_name.toLowerCase().includes(q))
      .slice(0, 2);
    matchedMembers.forEach((b) => {
      if (!result.find((r) => r.text === b.member_name)) {
        result.push({ type: 'member', text: b.member_name, icon: <FiUser /> });
      }
    });

    // Match IDs
    const matchedIds = books.filter(
      (b) =>
        (b.issue_id && b.issue_id.toLowerCase().includes(q)) ||
        (b.book_id && b.book_id.toLowerCase().includes(q))
    ).slice(0, 2);
    matchedIds.forEach((b) => {
      const idText = b.issue_id.toLowerCase().includes(q) ? b.issue_id : b.book_id;
      if (!result.find((r) => r.text === idText)) {
        result.push({ type: 'id', text: idText, icon: <FiHash /> });
      }
    });

    return result.slice(0, 5);
  };

  const suggestions = getSuggestions();

  const handleSuggestionClick = (text) => {
    setLocalValue(text);
    onChange(text);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && highlightIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[highlightIndex].text);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <FiSearch className={styles.searchIcon} aria-hidden="true" />
      <input
        ref={inputRef}
        type="text"
        className={styles.searchInput}
        placeholder="Search by title, ID, member name..."
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => localValue.trim() && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        aria-label="Search books"
        autoComplete="off"
      />
      {localValue && (
        <button
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <FiX aria-hidden="true" />
        </button>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <div className={styles.suggestions} role="listbox" aria-label="Search suggestions">
          {suggestions.map((s, i) => (
            <div
              key={`${s.type}-${s.text}`}
              className={`${styles.suggestionItem} ${i === highlightIndex ? styles.highlighted : ''}`}
              onClick={() => handleSuggestionClick(s.text)}
              role="option"
              aria-selected={i === highlightIndex}
            >
              <span className={styles.suggestionIcon}>{s.icon}</span>
              <span className={styles.suggestionText}>{s.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}