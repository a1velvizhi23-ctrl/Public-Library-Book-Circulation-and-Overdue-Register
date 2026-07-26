import { useEffect } from 'react';

/**
 * Custom hook for keyboard shortcuts.
 * @param {Object} shortcuts - Map of key combinations to handler functions
 * @param {boolean} enabled - Whether shortcuts are enabled
 */
export default function useKeyboardShortcuts(shortcuts = {}, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in inputs
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;

      for (const [combo, handler] of Object.entries(shortcuts)) {
        const parts = combo.toLowerCase().split('+');
        const hasCtrl = parts.includes('ctrl');
        const hasShift = parts.includes('shift');
        const mainKey = parts[parts.length - 1];

        if (
          mainKey === key &&
          hasCtrl === ctrl &&
          hasShift === e.shiftKey
        ) {
          e.preventDefault();
          handler(e);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
}