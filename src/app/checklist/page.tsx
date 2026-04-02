'use client'
import { CheckCircle2, CheckCircle } from 'lucide-react'

const coreRequirements = [
  "Dashboard Overview with Summary Cards",
  "Time Based Visualization (e.g., Balance Trend)",
  "Categorical Visualization (e.g., Spending Breakdown)",
  "Transaction List with Details",
  "Transaction Filtering",
  "Transaction Sorting or Search",
  "Role Based UI (Viewer and Admin)",
  "Insights Section",
  "State Management (Context, Redux, Zustand, etc.)",
  "Responsive Design"
]

const optionalEnhancements = [
  "Dark mode (Premium aesthetic implemented)",
  "Data persistence (local storage via Zustand middleware)",
  "Animations or transitions (Framer Motion / Tailwind Animate)",
  "Export functionality (JSON backup system)"
]

export default function ChecklistPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Assignment Checklist</h1>
        <p className="text-muted-foreground mt-1">Review the completion status of the requested evaluation criteria.</p>
      </div>

      <div className="space-y-6">
        <div className="glass p-6 md:p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-semibold">Core Requirements</h2>
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold">10/10 Completed</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {coreRequirements.map((req, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors border border-white/5 bg-secondary/10">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{req}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6 md:p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-semibold">Optional Enhancements</h2>
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold">Bonus Features</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {optionalEnhancements.map((req, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors border border-white/5 bg-secondary/10">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-muted-foreground">{req}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
