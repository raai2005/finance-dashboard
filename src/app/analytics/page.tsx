'use client'
import { useFinanceStore } from '@/store/useFinanceStore'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { useMemo } from 'react'

export default function AnalyticsPage() {
  const { transactions } = useFinanceStore()
  
  const chartData = useMemo(() => {
    // Group expenses by category
    const expenses = transactions.filter(t => t.type === 'expense')
    const grouped = expenses.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(grouped)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
  }, [transactions])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">Deep dive into your spending patterns.</p>
      </div>

      <div className="glass p-6 rounded-2xl mb-8">
        <h3 className="text-lg font-semibold mb-6">Spending by Category</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="#888" tickFormatter={(v) => `$${v}`} />
              <YAxis dataKey="name" type="category" stroke="#888" width={100} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f1f22', borderColor: '#27272a', borderRadius: '8px' }}
                itemStyle={{ color: '#fafafa' }}
                formatter={(value: any) => `$${value}`}
              />
              <Bar dataKey="amount" fill="#c2e252" radius={[0, 4, 4, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
