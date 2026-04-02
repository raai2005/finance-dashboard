'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Receipt, PieChart, Settings, X, CheckSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFinanceStore } from '@/store/useFinanceStore'

const navItems = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: Receipt },
  { name: 'Analytics', href: '/analytics', icon: PieChart },
  { name: 'Checklist', href: '/checklist', icon: CheckSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isSidebarOpen, setSidebarOpen } = useFinanceStore()

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 z-30 bg-black/80 backdrop-blur-sm transition-opacity md:hidden", 
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )} 
        onClick={() => setSidebarOpen(false)}
      />
      <aside 
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background/95 backdrop-blur-xl transition-transform duration-300",
          !isSidebarOpen && "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black">
              F
            </div>
            Finance<span className="text-muted-foreground">Dash</span>
          </div>
          <button 
            className="md:hidden p-1 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-3 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                    isActive 
                      ? 'bg-secondary text-foreground font-medium' 
                      : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  )}
                >
                  <item.icon className={cn('h-5 w-5', isActive ? 'text-primary' : '')} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
