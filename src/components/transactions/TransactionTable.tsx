'use client'
import { useFinanceStore, Transaction } from '@/store/useFinanceStore'
import { Search, Plus, Edit2, Trash2, Inbox } from 'lucide-react'
import { useState } from 'react'
import { TransactionModal } from './TransactionModal'
import { toast } from 'sonner'

export function TransactionTable() {
  const { transactions, role, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, deleteTransaction } = useFinanceStore()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTx, setEditingTx] = useState<Transaction | undefined>(undefined)

  // Derive categories for filter
  const categories = ['All', ...Array.from(new Set(transactions.map(t => t.category)))]

  // Filter transactions
  const filtered = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx)
    setIsModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingTx(undefined)
    setIsModalOpen(true)
  }

  return (
    <div className="glass rounded-2xl overflow-hidden flex flex-col">
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex w-full md:w-auto flex-1 items-center gap-4">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              className="w-full bg-secondary/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              placeholder="Search description or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(c => (
              <option key={c} value={c as string}>{c as string}</option>
            ))}
          </select>
        </div>
        
        {role === 'admin' && (
          <button 
            onClick={handleAddNew}
            className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Transaction
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-secondary/30 text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
              {role === 'admin' && <th className="px-6 py-4 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={role === 'admin' ? 6 : 5} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground gap-3 animate-in fade-in duration-500">
                    <div className="p-4 rounded-full bg-secondary/50 ring-1 ring-white/10 mb-2">
                      <Inbox className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-base font-semibold text-foreground tracking-tight">No transactions found</p>
                    <p className="text-sm max-w-[280px] mb-2 leading-relaxed">
                      There is no matching financial data. Try adjusting your search filters or add a new entry.
                    </p>
                    {role === 'admin' && (
                      <button 
                        onClick={handleAddNew}
                        className="text-sm text-primary hover:text-primary-foreground hover:bg-primary/20 px-4 py-2 mt-2 rounded-lg transition-colors font-medium border border-primary/20"
                      >
                        Create your first transaction
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-secondary/20 transition-colors group">
                  <td className="px-6 py-4">{new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="px-6 py-4 font-medium">{tx.description}</td>
                  <td className="px-6 py-4">
                    <span className="bg-secondary px-2.5 py-1 rounded-md text-xs">{tx.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${tx.type === 'income' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium">{formatter.format(tx.amount)}</td>
                  {role === 'admin' ? (
                    <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(tx)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors focus:opacity-100">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => {
                          deleteTransaction(tx.id)
                          toast.success('Transaction deleted')
                        }} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors focus:opacity-100">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <TransactionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          transactionToEdit={editingTx}
        />
      )}
    </div>
  )
}
