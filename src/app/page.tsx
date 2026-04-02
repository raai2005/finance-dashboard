import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { Charts } from '@/components/dashboard/Charts'
import { Insights } from '@/components/dashboard/Insights'

export default function Home() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1">Here is a summary of your financial activity.</p>
      </div>
      <SummaryCards />
      <Charts />
      <Insights />
    </div>
  )
}
