'use client'
import { useFinanceStore } from '@/store/useFinanceStore'
import { useMemo } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts'

export function Charts() {
  const { transactions } = useFinanceStore()
  
  const areaData = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    let currentBalance = 0
    return sorted.map(tx => {
      if (tx.type === 'income') currentBalance += tx.amount
      else currentBalance -= tx.amount
      
      return {
        date: new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        balance: currentBalance,
      }
    })
  }, [transactions])

  const donutData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense')
    const grouped = expenses.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(grouped).map(([name, value]) => ({ name, value }))
  }, [transactions])

  const COLORS = ['#c2e252', '#3b82f6', '#f43f5e', '#a855f7', '#f97316', '#14b8a6']

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-8">
      <div className="glass p-6 rounded-2xl lg:col-span-2">
        <h3 className="text-lg font-semibold mb-6">Balance Trend</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c2e252" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#c2e252" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f1f22', borderColor: '#27272a', borderRadius: '8px' }}
                itemStyle={{ color: '#fafafa' }}
              />
              <Area type="monotone" dataKey="balance" stroke="#c2e252" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-6">Spending Breakdown</h3>
        <div className="h-[300px] flex items-center justify-center relative">
          {donutData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f1f22', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fafafa' }}
                  formatter={(value: any) => `$${value}`}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-sm">No expenses directly tracked yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
