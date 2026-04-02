'use client'
import { useFinanceStore } from '@/store/useFinanceStore'
import { Sparkles, TrendingDown, Target } from 'lucide-react'
import { useMemo } from 'react'

export function Insights() {
  const { transactions } = useFinanceStore()
  
  const topCategory = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense')
    const grouped = expenses.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount
      return acc
    }, {} as Record<string, number>)
    
    let maxCat = 'None'
    let maxVal = 0
    for (const [cat, val] of Object.entries(grouped)) {
      if (val > maxVal) {
        maxVal = val
        maxCat = cat
      }
    }
    return { name: maxCat, value: maxVal }
  }, [transactions])

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  return (
    <div className="glass p-6 rounded-2xl mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">AI Insights</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-white/5">
          <div className="p-2 bg-destructive/10 rounded-lg text-destructive">
            <TrendingDown className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium mb-1 tracking-tight">Highest Spending Category</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your highest expense is <strong className="text-foreground">{topCategory.name}</strong> at {formatter.format(topCategory.value)}. Consider creating a budget for this category.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-white/5">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium mb-1 tracking-tight">Monthly Target</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You are currently saving <strong>34%</strong> of your income. Great job! Try to keep your non-essential expenses under $1,000 this month.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
