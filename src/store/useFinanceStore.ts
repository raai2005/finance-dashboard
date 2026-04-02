import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  date: string
  amount: number
  category: string
  type: TransactionType
  description: string
}

export type Role = 'viewer' | 'admin'

interface FinanceState {
  role: Role
  transactions: Transaction[]
  searchQuery: string
  selectedCategory: string
  
  // Actions
  setRole: (role: Role) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  addTransaction: (tx: Omit<Transaction, 'id'>) => void
  editTransaction: (id: string, tx: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  clearData: () => void
}

const generateId = () => Math.random().toString(36).slice(2, 11)

const initialTransactions: Transaction[] = [
  { id: generateId(), date: '2024-03-25', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: generateId(), date: '2024-03-26', amount: 150, category: 'Food', type: 'expense', description: 'Whole Foods' },
  { id: generateId(), date: '2024-03-27', amount: 45, category: 'Transport', type: 'expense', description: 'Uber' },
  { id: generateId(), date: '2024-03-28', amount: 200, category: 'Utilities', type: 'expense', description: 'Electric Bill' },
  { id: generateId(), date: '2024-03-29', amount: 1500, category: 'Rent', type: 'expense', description: 'Apartment Rent' },
  { id: generateId(), date: '2024-03-29', amount: 120, category: 'Entertainment', type: 'expense', description: 'Netflix & Spotify' },
  { id: generateId(), date: '2024-03-30', amount: 300, category: 'Shopping', type: 'expense', description: 'Amazon' },
  // Previous month data for trends
  { id: generateId(), date: '2024-02-25', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: generateId(), date: '2024-02-26', amount: 200, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: generateId(), date: '2024-02-27', amount: 1800, category: 'Rent', type: 'expense', description: 'Apartment Rent' },
]

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      role: 'viewer',
      transactions: initialTransactions,
      searchQuery: '',
      selectedCategory: 'All',

      setRole: (role) => set({ role }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      
      addTransaction: (tx) => set((state) => ({
        transactions: [{ ...tx, id: generateId() }, ...state.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      })),
      
      editTransaction: (id, updatedTx) => set((state) => ({
        transactions: state.transactions.map((t) => 
          t.id === id ? { ...t, ...updatedTx } : t
        ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      })),
      
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),
      
      clearData: () => set({ transactions: [] }),
    }),
    {
      name: 'finance-storage', 
    }
  )
)
