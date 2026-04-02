'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Receipt, PieChart, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: Receipt },
  { name: 'Analytics', href: '/analytics', icon: PieChart },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background/50 backdrop-blur-xl">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black">
            F
          </div>
          Finance<span className="text-muted-foreground">Dash</span>
        </div>
      </div>
      <div className="px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
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
  )
}
