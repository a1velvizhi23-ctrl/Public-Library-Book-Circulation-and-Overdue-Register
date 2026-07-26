import { useState, useEffect, useCallback } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import styles from './Toast.module.css';

let toastIdCounter = 0;
let addToastFn = null;

/**
 * Toast notification component with auto-dismiss and stacking.
 */
export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    addToastFn = (toast) => {
      const id = ++toastIdCounter;
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => removeToast(id), toast.duration || 4000);
    };
    return () => {
      addToastFn = null;
    };
  }, [removeToast]);

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container} aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  const icons = {
    success: <FiCheckCircle />,
    error: <FiAlertCircle />,
    info: <FiInfo />,
  };

  return (
    <div className={`${styles.toast} ${styles[toast.type || 'info']}`} role="alert">
      <span className={styles.toastIcon}>{icons[toast.type] || icons.info}</span>
      <span className={styles.toastMessage}>{toast.message}</span>
      <button className={styles.toastClose} onClick={onDismiss} aria-label="Dismiss notification">
        <FiX />
      </button>
    </div>
  );
}

/**
 * Show a toast notification.
 * @param {string} message - The message to display
 * @param {'success'|'error'|'info'} type - The type of toast
 * @param {number} duration - Auto-dismiss duration in ms
 */
export function showToast(message, type = 'info', duration = 4000) {
  if (addToastFn) {
    addToastFn({ message, type, duration });
  }
}