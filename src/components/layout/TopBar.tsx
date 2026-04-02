'use client'
import { useFinanceStore } from '@/store/useFinanceStore'
import { Bell, Search, UserCircle, Menu, LogOut } from 'lucide-react'

export function TopBar() {
  const { role, setRole, setSidebarOpen } = useFinanceStore()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/50 px-6 backdrop-blur-xl">
      <div className="flex items-center flex-1 gap-4">
        <button 
          className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-muted-foreground hover:text-foreground transition-colors hidden md:block">
          <Bell className="h-5 w-5" />
        </button>
        
        <div className="hidden md:block h-6 w-px bg-border" />
        
        <div className="flex items-center gap-3">
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as 'viewer' | 'admin')}
            className="bg-secondary text-sm border-border border rounded-md px-2 py-1 text-foreground focus:ring-1 focus:ring-primary outline-none cursor-pointer"
          >
            <option value="viewer">Viewer Mode</option>
            <option value="admin">Admin Mode</option>
          </select>

          <div className="relative group">
            <button className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <UserCircle className="h-5 w-5" />
            </button>
            
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-card border border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-sm font-medium">Demo User</p>
                <p className="text-xs text-muted-foreground truncate">user@finance-dash.com</p>
              </div>
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
                  Profile Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors mb-1 mt-1 flex items-center gap-2">
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
