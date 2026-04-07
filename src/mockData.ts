import { type Transaction } from "@/types";

const mockTransactions: Transaction[] = [
{ id: 1, type: "expense", amount: 1200, category: "Housing", description: "Monthly Rent", date: "2026-01-01" },
  { id: 2, type: "income", amount: 3500, category: "Salary", description: "Monthly Paycheck", date: "2026-01-01" },
  { id: 3, type: "expense", amount: 65, category: "Utilities", description: "Internet bill", date: "2026-01-10" },
  { id: 6, type: "expense", amount: 1200, category: "Housing", description: "Monthly Rent", date: "2026-02-01" },
  { id: 7, type: "expense", amount: 95, category: "Utilities", description: "Electric bill", date: "2026-02-05" },
  { id: 8, type: "expense", amount: 200, category: "Shopping", description: "New Running Shoes", date: "2026-02-14" },
  { id: 10, type: "income", amount: 500, category: "Freelance", description: "Consulting", date: "2026-02-28" },
  { id: 11, type: "expense", amount: 1200, category: "Housing", description: "Monthly Rent", date: "2026-03-01" },
  { id: 12, type: "expense", amount: 95, category: "Utilities", description: "Electric bill", date: "2026-03-02" },
  { id: 14, type: "expense", amount: 40, category: "Transport", description: "Uber", date: "2026-03-18" },
];

export default mockTransactions;