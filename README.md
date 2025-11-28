# KL University — Departments (Next.js)

A departmental info page for KL University built with Next.js that displays department details, faculty names, and contact information using static site generation.

## Features

- **Static Site Generation (SSG)**: Uses `getStaticProps()` to fetch and render data at build time
- **Responsive Design**: Optimized for quick loading on different devices (mobile, tablet, desktop)
- **Faculty Directory**: Displays department information with faculty contact details
- **Fast Performance**: Statically generated pages for optimal loading speed

## Quick Start

Install dependencies and run development server:

```powershell
cd "C:\Abhiram\KLU\KLU 2-1\End__Sem"
npm install
npm run dev
```

Open `http://localhost:3000` in your browser to view the application.

## Build for Production

```powershell
npm run build
npm start
```

## Project Structure

```
├── data/
│   └── departments.json     # Static department and faculty data
├── pages/
│   ├── _app.js             # Next.js app component
│   └── index.js            # Main page with getStaticProps()
├── styles/
│   └── globals.css         # Responsive CSS styles
└── package.json            # Dependencies and scripts
```

## Technology Stack

- **Next.js 13.4.12**: React framework with SSG support
- **React 18.2.0**: UI library
- **CSS3**: Responsive styling with CSS Grid and Flexbox

## Static Data

The application uses `data/departments.json` containing:
- Department information (CSE, ECE, Mechanical Engineering)
- Faculty details (names, titles, email, phone)
- Static data fetched at build time for optimal performance