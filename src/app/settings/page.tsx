'use client'
import { useFinanceStore } from '@/store/useFinanceStore'
import { Download, Trash2 } from 'lucide-react'

export default function SettingsPage() {
  const { transactions, clearData } = useFinanceStore()

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "finance_export.json")
    document.body.appendChild(downloadAnchorNode) // required for firefox
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const handleClear = () => {
    if (confirm("Are you sure you want to delete all transactions? This cannot be undone.")) {
      clearData()
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your application preferences and data.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">Data Management</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Export a copy of your content or delete your entire local database.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-white/5">
              <div>
                <p className="font-medium">Export Data (JSON)</p>
                <p className="text-sm text-muted-foreground">Download all your records to your device.</p>
              </div>
              <button 
                onClick={handleExport}
                className="bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Export
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-xl border border-destructive/20">
              <div>
                <p className="font-medium text-destructive">Danger Zone</p>
                <p className="text-sm text-destructive/80">Permanently delete all transaction data.</p>
              </div>
              <button 
                onClick={handleClear}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" /> Clear All Data
              </button>
            </div>
          </div>
        </div>
        
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">Appearance</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Customize the look and feel of your dashboard.
          </p>
          <div className="flex items-center gap-4">
             <div className="border-2 border-primary rounded-xl p-4 bg-background/50 cursor-pointer">
               <div className="font-medium mb-1">Dark Mode</div>
               <div className="text-xs text-muted-foreground">Premium glass aesthetic (Active)</div>
             </div>
             <div className="border border-white/10 rounded-xl p-4 bg-secondary/30 opacity-50 cursor-not-allowed">
               <div className="font-medium mb-1">Light Mode</div>
               <div className="text-xs text-muted-foreground">Coming soon</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
