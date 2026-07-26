# 📚 Library Circulation System

A **production-quality Library Management Dashboard** for tracking book circulation, overdue items, and borrowing statistics. Built with React 19, Vite, and a JSON-based data store. Features a modern, responsive UI with dark mode, analytics charts, and full accessibility support.

**The Screenshots and recordings are given below**
https://drive.google.com/drive/folders/1RowM2ylbHlcKY0TDG3dTsYXwQg4BqAhM?usp=sharing

---

## ✨ Features

### 📊 Dashboard
- **Summary Statistics Cards** — Animated counters showing total books, issued, returned, overdue, unique members, average borrow days, and most borrowed book
- **Instant Search** — Debounced search by title, book ID, issue ID, or member name with dropdown suggestions
- **Status Filtering** — Filter by All, Issued, Returned, or Overdue with visual indicators
- **Sort Options** — Sort by Newest First, Oldest First, or Alphabetical
- **Responsive Table** — Desktop table view with sticky header; mobile cards for small screens
- **Pagination** — Smart page numbers with ellipsis, previous/next navigation
- **Result Count** — Live count of filtered results with search query display

### 📖 Book Details
- **Status Badge** — Color-coded badge (Issued, Returned, Overdue)
- **Overdue Calculation** — Dynamic overdue day count with color indicators
- **Complete Record Info** — Issue ID, Book ID, Title, Member name, all dates
- **Issue Timeline** — Visual timeline with issue date, due date, and return date

### 📈 Statistics & Analytics
- **Summary Cards** — Same dashboard cards with animated counters
- **Bar Chart** — Top 7 most borrowed books using Recharts
- **Pie Chart** — Status distribution (Issued, Returned, Overdue) with donut chart
- **Line Chart** — Monthly borrowing trends (Issued, Returned, Overdue)
- **Most Active Member** — Profile card showing the most active library member

### 🎨 UI/UX
- **Dark Mode** — Toggle between light and dark themes (persisted in localStorage)
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- **Skeleton Loading** — Shimmer animations for cards and table while loading
- **Empty State** — Friendly illustration when no records match filters
- **Error State** — Error message with retry button
- **Toast Notifications** — Stackable success/error/info notifications
- **Animated Counters** — Animated number transitions on statistics cards
- **Tooltips** — Hover tooltips on interactive elements

### ⌨️ Accessibility
- **Skip to Main Content** — Keyboard-accessible skip link
- **ARIA Labels** — Descriptive labels on all interactive elements
- **Keyboard Navigation** — Full keyboard support for search, pagination, and shortcuts
- **Focus Indicators** — Visible focus states on all interactive elements
- **Screen Reader Support** — Semantic HTML and ARIA roles throughout
- **Color Contrast** — WCAG-compliant contrast ratios

### ⌨️ Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl+J` | Export filtered records as JSON |
| `Ctrl+C` | Export filtered records as CSV |
| `Ctrl+P` | Print report |

### 📦 Export & Print
- **Export JSON** — Download filtered records as a JSON file
- **Export CSV** — Download filtered records as a CSV file
- **Print Report** — Print the current filtered view

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework with hooks and lazy loading |
| **Vite 8** | Build tool and dev server |
| **JavaScript (ES6+)** | Programming language |
| **CSS Modules** | Scoped component styling |
| **React Router v7** | Client-side routing with lazy routes |
| **React Icons** | Icon library (Feather icons) |
| **Recharts** | Charting library (Bar, Pie, Line) |
| **JSON** | Data storage (no database required) |

---

## 📁 Project Structure

```
library-circulation/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── AnimatedCounter.jsx     — Animated number transitions
│   │   ├── BookDetail.jsx/.css     — Full book record view
│   │   ├── BookTable.jsx/.css      — Desktop table + mobile cards
│   │   ├── EmptyState.jsx/.css     — No results illustration
│   │   ├── ErrorState.jsx/.css     — Error display with retry
│   │   ├── Footer.jsx/.css         — Site footer
│   │   ├── Loading.jsx/.css        — Skeleton shimmer loader
│   │   ├── Navbar.jsx/.css         — Navigation + theme toggle
│   │   ├── Pagination.jsx/.css     — Page navigation
│   │   ├── SearchBar.jsx/.css      — Search with suggestions
│   │   ├── StatsChart.jsx/.css     — Recharts charts + member card
│   │   ├── StatusFilter.jsx/.css   — Filter + sort controls
│   │   ├── SummaryCards.jsx/.css   — Stats cards
│   │   └── Toast.jsx/.css          — Toast notifications
│   ├── hooks/
│   │   ├── useKeyboardShortcuts.js — Keyboard shortcut manager
│   │   └── usePageTitle.js         — Dynamic document title
│   ├── pages/
│   │   ├── Dashboard.jsx/.css      — Main dashboard page
│   │   ├── BookDetails.jsx         — Single record detail page
│   │   ├── Statistics.jsx          — Analytics page
│   │   └── NotFound.jsx            — 404 error page
│   ├── data/
│   │   └── books.json              — 45 book circulation records
│   ├── utils/
│   │   ├── constants.js            — Application-wide constants
│   │   ├── dateUtils.js            — Date formatting & calculation
│   │   ├── filterUtils.js          — Search, filter, sort functions
│   │   └── statsUtils.js           — Statistics computation
│   ├── App.jsx                     — Root component with routing
│   ├── main.jsx                    — Entry point
│   └── index.css                   — Global styles and variables
├── index.html                      — HTML template
├── package.json                    — Dependencies and scripts
├── vite.config.js                  — Vite configuration
└── README.md                       — Documentation
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/library-circulation.git

# Navigate to the project directory
cd library-circulation

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The dev server supports hot module replacement — changes will appear instantly.

### Production Build

```bash
npm run build
```

The build output is in the `dist/` directory. Optimized with code splitting, CSS minification, and JavaScript tree-shaking.

```bash
npm run preview
```

Preview the production build locally.

---

## 📊 Data Model

### Field Definitions

| Field | Description |
|-------|-------------|
| `issue_id` | Unique identifier for each book issue transaction (e.g., ISS-001) |
| `book_id` | Unique identifier for the book (e.g., BOK-101) |
| `title` | Title of the book |
| `member_name` | Name of the library member who borrowed the book |
| `issue_date` | Date when the book was issued (YYYY-MM-DD) |
| `due_date` | Date by which the book should be returned (YYYY-MM-DD) |
| `return_date` | Actual date returned (null if not yet returned) |
| `status` | Current status: `Issued`, `Returned`, or `Overdue` |

### Status Logic

- **Issued**: Book is currently borrowed; `return_date` is null
- **Returned**: Book has been returned; `return_date` has a value
- **Overdue**: Book is past its due date; `return_date` is null

## ⏰ Overdue Calculation

- **Returned books**: `Math.max(return_date - due_date, 0)` — days between return and due date, never negative
- **Issued/Overdue books**: `Math.max(today - due_date, 0)` — days from due date to current date
- If returned before due date, overdue days = 0

## 📈 Statistics Calculations

| Statistic | Calculation |
|-----------|-------------|
| Total Books | Count of all records |
| Books Issued | Count of records with status "Issued" |
| Books Returned | Count of records with status "Returned" |
| Overdue Books | Count of records with status "Overdue" |
| Total Members | Count of unique `member_name` values |
| Avg Borrow Days | Average of `return_date - issue_date` for returned books |
| Most Borrowed | Book title with the highest occurrence count |
| Most Active Member | Member name with the highest borrow count |
| Total Overdue Days | Sum of `calculateOverdue()` across all records |

## 🧮 Filtering & Search

- **Status Filter**: Exact match on `status` field
- **Text Search**: Case-insensitive match on `title`, `book_id`, `issue_id`, or `member_name`
- **Sort**: By `issue_date` (newest/oldest) or `title` (alphabetical)
- All filters stack together and update results in real-time

---

## 🧪 Assessment Coverage

| Requirement | Status |
|-------------|--------|
| View all issued books | ✅ |
| Search books instantly with suggestions | ✅ |
| Filter records by status | ✅ |
| View complete book details with timeline | ✅ |
| Calculate and display overdue days | ✅ |
| Display borrowing statistics with charts | ✅ |
| Loading states with skeleton animation | ✅ |
| Error states with retry functionality | ✅ |
| Empty states with helpful message | ✅ |
| Fully responsive design | ✅ |
| Dark mode toggle (persisted) | ✅ |
| Export filtered records as JSON | ✅ |
| Export filtered records as CSV | ✅ |
| Print report | ✅ |
| Keyboard shortcut support | ✅ |
| Accessibility (ARIA, keyboard nav, skip link) | ✅ |
| Animated statistics counters | ✅ |
| Toast notifications for actions | ✅ |

---

## 🔮 Architecture Overview

### Component Architecture

```
App (Router + Theme + Layout)
├── Navbar (Navigation + Theme Toggle + Mobile Menu)
├── Routes (Suspense + Lazy Loading)
│   ├── Dashboard
│   │   ├── SummaryCards (Animated Stats)
│   │   ├── SearchBar (Debounced + Suggestions)
│   │   ├── StatusFilter (Filter + Sort)
│   │   ├── BookTable (Table + Mobile Cards)
│   │   └── Pagination
│   ├── BookDetails
│   │   └── BookDetail (Record Info + Timeline)
│   ├── Statistics
│   │   ├── SummaryCards
│   │   └── StatsChart (Bar + Pie + Line + Member Card)
│   └── NotFound
├── Footer
└── ToastContainer (Global Notifications)
```

### Data Flow

1. **Static JSON** — `books.json` is imported directly as static data
2. **State Management** — React `useState` + `useMemo` for computed values
3. **Filter Pipeline** — `statusFilter → searchQuery → sortBy` for filtered book list
4. **Statistics** — `useMemo`-based computation for all stat cards and charts
5. **Theme** — `useState` + `useEffect` to sync with `localStorage` and `data-theme` attribute
6. **Routing** — React Router v7 with lazy-loaded pages (`React.lazy` + `Suspense`)

---

## 💡 Future Improvements

- [ ] Backend API integration with a real database (PostgreSQL, MongoDB)
- [ ] User authentication and role-based access control
- [ ] Email notifications for overdue books
- [ ] Barcode/QR code scanning for check-in/check-out
- [ ] Book reservation system
- [ ] Fine calculation and payment tracking
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics with more chart types (heatmap, treemap)
- [ ] Bulk import/export of records via file upload
- [ ] Audit logging for all transactions
- [ ] Real-time updates with WebSockets

---

## ⚠️ Known Limitations

- **Data Persistence**: Currently uses a static JSON file. Changes are not saved; data resets on page reload. A backend API is needed for persistent storage.
- **Authentication**: No user login system. All features are publicly accessible.
- **Offline Support**: No service worker or PWA configuration.
- **Testing**: Unit tests and integration tests are not yet implemented.

---

## 📄 License

This project is created for assessment purposes.

---

Built with ❤️ using **React 19**, **Vite 8**, and modern JavaScript best practices."# Public-Library-Book-Circulation-and-Overdue-Register" 
