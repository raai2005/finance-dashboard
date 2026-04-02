# Premium Finance Dashboard

A sleek, responsive, and feature-rich Finance Dashboard built to track, manage, and understand user financial activity. The application utilizes a premium dark-mode "glassmorphism" aesthetic and handles complex local state management efficiently.

## 🚀 Features

### **1. Comprehensive Dashboard Overview**
- **Summary Cards**: Track Total Balance, Income, and Expenses instantly.
- **Dynamic Visualizations**: 
  - **Balance Trend**: Beautiful interactive area charts mapping your money flow over time.
  - **Spending Breakdown**: Donut charts intuitively categorizing your expenses.
- **AI-Powered Insights**: Automatically calculates your highest spending categories and monthly savings targets dynamically based on your data set.

### **2. Advanced Transactions Management**
- **Robust Data Table**: View, filter, search, and manage a complete list of transactions.
- **Client-Side Filtering**: Real-time filtering by category and instant search by description.
- **Interactive Modals**: Smooth animated modals for adding and editing transactions.

### **3. Role-Based Access Control (RBAC) Simulation**
- Switch between **Viewer Mode** and **Admin Mode** dynamically right from the Top Navigation.
- Form inputs, Edit, and Delete actions are gracefully hidden or disabled when in Viewer mode, guaranteeing data integrity.

### **4. Local Storage Persistence & Exports**
- **100% Persisted State**: Utilizing Zustand's persist middleware, all your transactions, active roles, and preferences are automatically saved to `localStorage` and persist through browser refreshes.
- **JSON Data Export**: Instantly download a secure `.json` backup of all your transactions directly from the Settings page.

## 🛠️ Technology Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router format)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for robust static typing.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom native CSS variables for the glassmorphism dark theme.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for lightweight, predictable global state without deeply nested contexts.
- **Visualizations**: [Recharts](https://recharts.org/) for elegant data plotting.
- **Icons**: [Lucide React](https://lucide.dev/) for crisp, scalable vectors.

## ⚙️ Local Setup & Installation

Follow these steps to get the project running locally:

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd finance_dashboard
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

**4. Open the application**
Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design Philosophy
The UI was meticulously crafted to present complex financial data elegantly rather than overwhelmingly. It embraces a strict dark mode interface layered with subtle translucent glass panels (`backdrop-filter: blur()`). This eliminates visual clutter while allowing vibrant accents (like standard green for income, red for expenses, and custom UI primary colors) to immediately draw user focus to important metrics.
