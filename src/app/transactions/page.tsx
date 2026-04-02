import { TransactionTable } from '@/components/transactions/TransactionTable'

export default function TransactionsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground mt-1">Manage and review your financial activity.</p>
      </div>
      
      <TransactionTable />
    </div>
  )
}
