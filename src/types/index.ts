export interface Transaction {
    id: number;
    amount: number;
    category: Category;
    description: string;
    date: string;
    type: TransactionType;
}
export type TransactionType = 'income' | 'expense';
export type Category = 
  | "Housing"
  | "Food"
  | "Transport"
  | "Entertainment"
  | "Healthcare"
  | "Shopping"
  | "Utilities"
  | "Education"
  | "Salary"
  | "Freelance"
  | "Investment"
    | "Other";

export type Budget = {
    id: number,
    category: Category,
    limit: number
    }