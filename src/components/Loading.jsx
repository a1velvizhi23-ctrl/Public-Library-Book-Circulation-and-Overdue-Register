import styles from './Loading.module.css';

/**
 * Loading component with skeleton cards and skeleton table.
 * @param {string} type - 'cards' for summary card skeletons, 'table' for table skeletons
 */
export default function Loading({ type = 'all' }) {
  return (
    <div className={styles.wrapper} aria-label="Loading content" role="status">
      <div aria-hidden="true">
        {(type === 'all' || type === 'cards') && (
          <div className={styles.skeletonGrid}>
            {[...Array(7)].map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
                <div className={`${styles.skeletonLine} ${styles.skeletonLineLong}`} style={{ height: 28, marginTop: 8 }} />
                <div className={`${styles.skeletonLine} ${styles.skeletonLineMedium}`} />
              </div>
            ))}
          </div>
        )}

        {(type === 'all' || type === 'table') && (
          <div className={styles.skeletonTable}>
            <div className={styles.skeletonTableHeader}>
              <div className={styles.skeletonLine} style={{ width: '30%' }} />
            </div>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={styles.skeletonTableRow}>
                <div className={`${styles.skeletonCell} ${styles.skeletonCellSmall}`} />
                <div className={`${styles.skeletonCell} ${styles.skeletonCellSmall}`} />
                <div className={styles.skeletonCell} />
                <div className={`${styles.skeletonCell} ${styles.skeletonCellSmall}`} />
                <div className={`${styles.skeletonCell} ${styles.skeletonCellSmall}`} />
                <div className={`${styles.skeletonCell} ${styles.skeletonCellSmall}`} />
                <div className={`${styles.skeletonCell} ${styles.skeletonCellSmall}`} />
                <div className={`${styles.skeletonCell} ${styles.skeletonCellSmall}`} />
                <div className={`${styles.skeletonCell} ${styles.skeletonCellSmall}`} />
              </div>
            ))}
          </div>
        )}

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}