'use client'
import { useFinanceStore } from '@/store/useFinanceStore'
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react'
import { useMemo } from 'react'

export function SummaryCards() {
  const { transactions } = useFinanceStore()
  
  // Basic calculation logic
  const { totalIncome, totalExpense, balance } = useMemo(() => {
    return transactions.reduce((acc, tx) => {
      if (tx.type === 'income') {
        acc.totalIncome += tx.amount
        acc.balance += tx.amount
      } else {
        acc.totalExpense += tx.amount
        acc.balance -= tx.amount
      }
      return acc
    }, { totalIncome: 0, totalExpense: 0, balance: 0 })
  }, [transactions])

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-8">
      <Card title="Total Balance" amount={formatter.format(balance)} icon={Wallet} trend="+2.5%" isPositive={true} />
      <Card title="Total Income" amount={formatter.format(totalIncome)} icon={ArrowUpRight} trend="+12.5%" isPositive={true} />
      <Card title="Total Expenses" amount={formatter.format(totalExpense)} icon={ArrowDownRight} trend="-4.1%" isPositive={false} />
    </div>
  )
}

function Card({ title, amount, icon: Icon, trend, isPositive }: any) {
  return (
    <div className="glass p-6 rounded-2xl relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="p-2 bg-secondary/50 rounded-lg group-hover:bg-primary/20 transition-colors">
          <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
      <h3 className="text-3xl font-bold tracking-tight text-foreground">{amount}</h3>
      <div className="mt-4 flex items-center gap-2">
        <span className={`text-sm font-medium ${isPositive ? 'text-primary' : 'text-destructive'}`}>
          {trend}
        </span>
        <span className="text-xs text-muted-foreground">vs last month</span>
      </div>
    </div>
  )
}
