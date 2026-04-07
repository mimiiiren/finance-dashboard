import { create } from "zustand";
import { type Transaction, type Budget } from "@/types";
import mockData from "../mockData";

// counterstore holds all global types
type TransactionStore = {
  // transactions, an array of objects
  transactions: Transaction[];
  budgets: Budget[];

  // function to add newTransaction
  addTransaction: (newTransaction: Transaction) => void;
  removeTransaction: (id: number) => void;
  addBudget: (newBudget: Budget) => void;
  removeBudgets: (id: number) => void;
};
export const useTransactionStore = create<TransactionStore>((set) => ({
  // set initial state
  transactions: mockData,
  budgets: [    
    { id: 1, category: "Housing", limit: 1500 },
    { id: 2, category: "Food", limit: 200 },
    { id: 3, category: "Transport", limit: 150 },
    { id: 4, category: "Entertainment", limit: 100 },
    { id: 5, category: "Healthcare", limit: 300 },
    { id: 6, category: "Shopping", limit: 100 },
    { id: 7, category: "Utilities", limit: 250 },
  ],

  addTransaction: (newTransaction) =>
    set((state) => ({ transactions: [...state.transactions, newTransaction] })),
  removeTransaction: (id) => set((state) => ({transactions: state.transactions.filter(item => item.id !== id)})),
  addBudget: (newBudget) =>
    set((state) => ({ budgets: [...state.budgets, newBudget] })),
    removeBudgets: (id) => set((state) => ({budgets: state.budgets.filter(item => item.id !== id)})),

}));
