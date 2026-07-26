import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { FiBarChart2, FiPieChart, FiTrendingUp, FiAward } from 'react-icons/fi';
import styles from './StatsChart.module.css';

/**
 * StatsChart component with Bar, Pie, and Line charts using Recharts.
 * @param {Object} props
 * @param {Array} props.topBooks - Top borrowed books data
 * @param {Array} props.statusDistribution - Status distribution data
 * @param {Array} props.monthlyTrend - Monthly borrow trend data
 * @param {Object} props.mostActiveMember - Most active member data
 */
export default function StatsChart({ topBooks = [], statusDistribution = [], monthlyTrend = [], mostActiveMember = null }) {
  return (
    <div className={styles.chartGrid}>
      {/* Bar Chart - Top Borrowed Books */}
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>
          <FiBarChart2 aria-hidden="true" style={{ color: 'var(--color-primary)' }} />
          Top Borrowed Books
        </h3>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topBooks} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="title"
                tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
                angle={-35}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} />
              <Tooltip
                contentStyle={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                }}
              />
              <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart - Status Distribution */}
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>
          <FiPieChart aria-hidden="true" style={{ color: 'var(--color-success)' }} />
          Status Distribution
        </h3>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Most Active Member Card */}
      {mostActiveMember && (
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>
            <FiAward aria-hidden="true" style={{ color: '#7c3aed' }} />
            Most Active Member
          </h3>
          <div className={styles.memberCard}>
            <div className={styles.memberAvatar}>
              {mostActiveMember.name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.memberInfo}>
              <div className={styles.memberName}>{mostActiveMember.name}</div>
              <div className={styles.memberStat}>
                <strong>{mostActiveMember.count}</strong> books borrowed
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Line Chart - Monthly Trend */}
      <div className={`${styles.chartCard} ${styles.chartCardFull}`}>
        <h3 className={styles.chartTitle}>
          <FiTrendingUp aria-hidden="true" style={{ color: 'var(--color-warning)' }} />
          Monthly Borrow Trend
        </h3>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
              />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} />
              <Tooltip
                contentStyle={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}
              />
              <Line
                type="monotone"
                dataKey="issued"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ r: 4, fill: 'var(--color-primary)' }}
                name="Issued"
              />
              <Line
                type="monotone"
                dataKey="returned"
                stroke="var(--color-success)"
                strokeWidth={2}
                dot={{ r: 4, fill: 'var(--color-success)' }}
                name="Returned"
              />
              <Line
                type="monotone"
                dataKey="overdue"
                stroke="var(--color-danger)"
                strokeWidth={2}
                dot={{ r: 4, fill: 'var(--color-danger)' }}
                name="Overdue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
