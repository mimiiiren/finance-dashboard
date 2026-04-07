# Happy Money 💰

A personal finance dashboard built to help users track income and expenses, visualize spending patterns, and manage monthly budgets.

## Overview

Happy Money gives users a clear picture of their financial health through an intuitive interface. Users can log transactions, set category budgets, and spot trends through interactive charts — all in one place.

## Features

- **Transaction Tracking** — Log income and expenses with category, date, description, and amount
- **Budget Management** — Set monthly spending limits per category with real-time progress indicators
- **Spending Analytics** — Visualize income vs expenses over time with a line chart
- **Category Breakdown** — See spending distribution by category with an interactive pie chart
- **Dashboard Overview** — Monthly summary of total income, total expenses, and net balance
- **Persistent State** — Global state management keeps data consistent across all pages

## Tech Stack

- **React** with **TypeScript** — component architecture and type safety
- **Zustand** — lightweight global state management
- **Tailwind CSS** — utility-first styling
- **shadcn/ui** — accessible, unstyled component primitives
- **Recharts** — composable chart library for data visualization
- **React Router** — client-side navigation
- **Vite** — fast development build tool

## Getting Started
```bash
# Clone the repository
https://github.com/mimiiiren/finance-dashboard.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Project Structure
```text
src/
src/
├── components/
│   ├── layout/      # Sidebar and app shell
│   ├── dashboard/   # Chart and visualization components
│   └── ui/          # shadcn/ui component library
├── pages/           # Dashboard, Transactions, Budgets, Analytics
├── store/           # Zustand global state management
├── types/           # TypeScript interfaces and shared types
├── data/            # Mock data and constants for development
└── lib/             # Helper functions (formatting, calculations)
```

## Key Technical Decisions

**Zustand over Context API** — chosen for its minimal boilerplate and straightforward API. Transaction and budget state is accessible across all pages without prop drilling.

**TypeScript throughout** — strict typing on transaction and budget interfaces catches category mismatches and data shape errors at compile time rather than runtime.

**Component-driven architecture** — chart components are isolated and receive pre-processed data, keeping business logic out of the UI layer.

## Upcoming Features

**CSV Export/Import** — Download transaction history or bulk-upload bank statements.

**Dark Mode Support** — Seamless theme switching using `next-themes`.

**Data Persistence** — Integration with Supabase or PostgreSQL for cloud syncing.
