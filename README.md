# Finance Dashboard UI

A clear, responsive, and robust Finance Dashboard built to allow users to intuitively track and understand their financial activity. This project demonstrates proficiency in modern React patterns, state management, and aesthetic interface design.

## Overview of Approach

When approaching this challenge, my primary goal was to build a system that feels **premium, interactive, and predictable**. I chose a modern frontend-heavy stack without relying on a backend. 

1. **Architecture**: I used **Next.js 15 (App Router)** as the foundation for clean page-based routing (`/`, `/transactions`, `/analytics`, `/settings`), keeping the layout shells separate from the content logic.
2. **State Management Strategy**: I opted for **Zustand** coupled with a data persistence middleware. This allows for a completely centralized global state controlling filters, roles, and CRUD transactions. By leveraging local storage, the application simulates a persistent database environment without needing a real mock API, ensuring your data remains even after a browser refresh.
3. **Design Philosophy (UI/UX)**: I avoided traditional component libraries (like Shadcn or MUI) to demonstrate raw proficiency with **Tailwind CSS v4**. I implemented a custom dark "glassmorphism" aesthetic. The dark interface reduces eye strain, while translucent cards allow the rich visualizations to stand out. 
4. **Data Visualization**: I integrated **Recharts** to handle complex SVGs and layout data dynamically for both time-series (Balance Trend) and categorical (Spending Breakdown) interpretations.

## Explanation of Features

### 1. Dashboard Overview
- **Summary Cards**: Rapidly displays dynamic calculation of Total Balance, Total Income, and Total Expenses updated in real-time as transactions change.
- **Data Visualizations**: 
  - **Balance Trend**: An Area Chart calculating cumulative balance over time.
  - **Spending Breakdown**: A Donut Chart calculating proportions of expense categories.
- **AI Insights Context**: A custom component that programmatically derives the highest spending category and creates dynamic budget feedback based on the user's ratio of income vs expense.

### 2. Transactions Control
- **Interactive List**: An organized table mapping out transaction history.
- **Client-Side Filtering**: Includes a real-time text search (evaluating descriptions) and a distinct category dropdown filter.
- **Add/Edit Modals**: Robust controlled forms for adding or editing data, enforcing type safety and required fields.

### 3. Role-Based UI Simulation
- Integrated deeply into the global state is a `Role Switcher` accessible in the top-right navigation bar.
- Switching to **"Viewer"** allows reading data and using filters, but completely hides the "Add Transaction", "Edit", and "Delete" pathways protecting data integrity.
- Switching to **"Admin"** immediately reveals full CRUD options seamlessly throughout the UI.

### 4. Extra Enhancements
- **Data Persistence**: As noted, refreshing the page will not wipe your session, preserving the workflow smoothly.
- **Data Exporting**: Included in the Settings page is an explicit "Export" function that bundles current Zustand state into a JSON object and downloads it to your machine programmatically.

## Setup Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Getting Started

**1. Clone the repository**
Open your terminal and clone the repository:
```bash
git clone <your-repo-link-here>
cd finance_dashboard
```

**2. Install dependencies**
Install the necessary packages via npm:
```bash
npm install
```

**3. Run the development server**
Launch the local development environment:
```bash
npm run dev
```

**4. View the Dashboard**
Open your preferred web browser and navigate to:
[http://localhost:3000](http://localhost:3000)

> *The repository does not require any `.env` configurations as all management is handled fully client-side.*
