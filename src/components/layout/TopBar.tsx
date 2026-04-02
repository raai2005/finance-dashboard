'use client'
import { useFinanceStore } from '@/store/useFinanceStore'
import { Bell, Search, UserCircle } from 'lucide-react'

export function TopBar() {
  const { role, setRole } = useFinanceStore()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/50 px-6 backdrop-blur-xl">
      <div className="flex items-center flex-1">
        {/* Placeholder for global search */}
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        
        <div className="h-6 w-px bg-border" />
        
        <div className="flex items-center gap-3">
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as 'viewer' | 'admin')}
            className="bg-secondary text-sm border-border border rounded-md px-2 py-1 text-foreground focus:ring-1 focus:ring-primary outline-none cursor-pointer"
          >
            <option value="viewer">Viewer Mode</option>
            <option value="admin">Admin Mode</option>
          </select>
          <UserCircle className="h-7 w-7 text-muted-foreground" />
        </div>
      </div>
    </header>
  )
}
