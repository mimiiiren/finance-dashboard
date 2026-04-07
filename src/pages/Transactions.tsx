import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogDescription,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { type Category, type TransactionType } from "@/types";
import { useTransactionStore } from "../store/store";
import { Search, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function Transactions() {
  // grab global array and function from store.ts
  const transactions = useTransactionStore((state) => state.transactions);
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const removeTransaction = useTransactionStore(
    (state) => state.removeTransaction,
  );

  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<Category>("Food");
  const [type, setType] = useState<TransactionType>("expense");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  // map through each array for <select> values
  const expenseCategory: Category[] = [
    "Housing",
    "Food",
    "Transport",
    "Entertainment",
    "Healthcare",
    "Shopping",
    "Utilities",
    "Education",
    "Other",
  ];
  const incomeCategory: Category[] = [
    "Salary",
    "Freelance",
    "Investment",
    "Other",
  ];
  // user types in search bar, any letter that is equivalent to category or description is rendered
  const searchTransactions = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter(
      (t) =>
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        formatDate(t.date).toLowerCase().includes(search.toLowerCase()),
    );

  function handleSubmit() {
    if (!description || description.trim() === "") {
      alert("Please enter a description.");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }
    // collect all <input> and <select> into an object as new transaction
    const newTransaction = {
      id: Date.now(),
      type,
      amount,
      category,
      description,
      date,
    };
    // Zustand function with newTransaction as parameter
    addTransaction(newTransaction);
    setType("expense");
    setAmount(0);
    setCategory("Food");
    setDescription("");
    setDate("");
  }
  return (
    <div>
      <div className="flex justify-between items-center w-full overflow-hidden">
        <h1 className="text-2xl m-5 font-bold">Transactions</h1>
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-green-500 rounded-md px-2 h-10 text-white mx-5 hover:cursor-pointer">
              + Add Transaction
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Transaction </DialogTitle>
            </DialogHeader>
            <div className="flex gap-1 justify-center">
              {/* 2 buttons for expense and income tab. if expense is true, dynamically change expenseCategories */}
              <Button
                className="w-40"
                onClick={() => setType("expense")}
                variant={type === "expense" ? "default" : "outline"}
              >
                Expense
              </Button>
              <Button
                className="w-40"
                onClick={() => setType("income")}
                variant={type === "income" ? "default" : "outline"}
              >
                Income
              </Button>
            </div>

            <Input
              type="number"
              placeholder="Amount"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <select
              onChange={(e) => setCategory(e.target.value as Category)}
              value={category}
              className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1"
            >
              {(type === "expense" ? expenseCategory : incomeCategory).map(
                (c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ),
              )}
            </select>
            <Input type="date" onChange={(e) => setDate(e.target.value)} />
            <DialogDescription>
              <Input
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" onClick={handleSubmit}>
                  Save Transaction
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1 mx-5">
          {/* top-1/2 -translate-y-1/2 css trick to center vertically */}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4" />
          <Input
            className="pl-10"
            placeholder="Search transactions"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* table for transactions to render */}
      <div className="m-5 border border-gray-200 rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-[200px]">Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchTransactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium text-gray-800 p-3">
                  {t.description}
                </TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell>{formatDate(t.date)}</TableCell>
                <TableCell
                  className={`text-right ${t.type === "expense" ? "text-red-500" : "text-green-500"}`}
                >
                  {t.type === "expense" ? `-$${t.amount}` : `+$${t.amount}`}
                </TableCell>
                <TableCell className="group cursor-pointer items-center">
                  <Trash2
                    className="invisible group-hover:visible bg-red-100 text-red-500 rounded-sm w-6 h-6 px-1"
                    onClick={() => {
                      console.log("transaction id", t.id);
                      removeTransaction(t.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
            {/* only if transactions is empty, render this */}
            {transactions.length === 0 && (
              <TableRow className="bg-white">
                <TableCell className="p-10">
                  <p className="text-center">No transactions found</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
