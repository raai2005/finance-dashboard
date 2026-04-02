import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen md:pl-64 transition-all min-w-0">
        <TopBar />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden min-h-0">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
