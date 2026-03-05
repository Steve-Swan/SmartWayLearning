# Smart Way Learning Center — React Website

## Project Structure

```
smartway/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── UI.js              # Reusable: Button, Modal, Input, Reveal, AnimCounter, Marquee
│   │   ├── Logo.js            # SVG logo with graduation cap
│   │   ├── Navbar.js          # Main navigation bar (desktop + mobile)
│   │   ├── Sections.js        # TopBar, GradeAccordion, FocusSchedule
│   │   ├── AuthModal.js       # Login / Sign Up modal
│   │   ├── CartSidebar.js     # Shopping cart slide-out
│   │   ├── EnrollModal.js     # Program enrollment form
│   │   └── UserDashboard.js   # Student dashboard (enrollments, orders, profile)
│   ├── pages/
│   │   ├── HomePage.js        # Main landing page with all sections
│   │   └── AdminCRM.js        # Admin panel (users, enrollments, orders management)
│   ├── utils/
│   │   ├── constants.js       # Colors, products, programs data
│   │   └── db.js              # localStorage database helper
│   ├── styles/
│   │   └── global.css         # Global styles & animations
│   ├── App.js                 # Root app component
│   └── index.js               # Entry point
└── package.json
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open http://localhost:3000
```

## Features

### For Students / Parents
- **Sign up & Log in** — Create an account with name, email, phone, grade
- **Browse programs** — SHSAT, SAT, FOCUS, Special Ed, tutoring for all grades
- **Enroll online** — Select a program, enter student info, confirm enrollment
- **Rewards Shop** — 16 items with Add to Cart, quantity controls, checkout
- **Dashboard** — View enrollments, order history, and profile info

### For Admin
- **Login**: `admin@smartway.com` / `admin123`
- **CRM Dashboard** — Stats overview (users, enrollments, orders, revenue)
- **Users tab** — Search, view details, see all enrollments & orders per user, delete
- **Enrollments tab** — All enrollments with pause/activate toggle
- **Orders tab** — All shop orders with customer info and totals

## Data Storage
Currently uses `localStorage` for persistence. For production, replace `src/utils/db.js` with your backend (Firebase, Supabase, Express API, etc.).

## Tech Stack
- React 18
- No external UI library — all custom components
- Fonts: Outfit, Lora, JetBrains Mono (Google Fonts)
- Brand colors from smartwaylearningcenter.com
