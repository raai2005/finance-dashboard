'use client'
import { useFinanceStore, Transaction } from '@/store/useFinanceStore'
import { X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  transactionToEdit?: Transaction
}

export function TransactionModal({ isOpen, onClose, transactionToEdit }: Props) {
  const { addTransaction, editTransaction } = useFinanceStore()
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: '',
    type: 'expense' as 'income' | 'expense',
    description: ''
  })

  useEffect(() => {
    if (transactionToEdit) {
      setFormData({
        date: transactionToEdit.date,
        amount: transactionToEdit.amount.toString(),
        category: transactionToEdit.category,
        type: transactionToEdit.type,
        description: transactionToEdit.description
      })
    }
  }, [transactionToEdit])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amountNum = parseFloat(formData.amount)
    if (isNaN(amountNum) || !formData.category || !formData.description) return

    const payload = {
      date: formData.date,
      amount: amountNum,
      category: formData.category,
      type: formData.type,
      description: formData.description
    }

    if (transactionToEdit) {
      editTransaction(transactionToEdit.id, payload)
    } else {
      addTransaction(payload)
    }
    
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{transactionToEdit ? 'Edit Transaction' : 'New Transaction'}</h3>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Type</label>
              <select 
                value={formData.type} 
                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full bg-secondary border border-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Date</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full bg-secondary border border-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary [color-scheme:dark]"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input 
                type="number" 
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                required
                placeholder="0.00"
                className="w-full bg-secondary border border-white/5 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground">Category</label>
            <input 
              type="text" 
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              required
              placeholder="e.g. Groceries, Salary, Rent"
              className="w-full bg-secondary border border-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground">Description</label>
            <input 
              type="text" 
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Brief description"
              className="w-full bg-secondary border border-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 bg-secondary text-foreground hover:bg-secondary/80 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
