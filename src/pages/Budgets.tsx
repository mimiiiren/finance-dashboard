import { useTransactionStore } from "@/store/store";
import { type Category } from "@/types/index";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Budgets() {
  const [category, setCategory] = useState<Category>("Housing");
  const [budgetAmount, setBudgetAmount] = useState(0);
  const transactions = useTransactionStore((state) => state.transactions);
  const budgets = useTransactionStore((state) => state.budgets);
  const addBudget = useTransactionStore((state) => state.addBudget);
  const removeBudgets = useTransactionStore((state) => state.removeBudgets);
  const expenseByCategory: Record<string, number> = {};
  const budgetCategory: Category[] = [
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
  // hash map approach Big O(n + m), only 1,100 operations
  // filter through transactions for current month. for monthly expense of each category
  const currentMonth = new Date().getMonth();
  transactions.forEach((t) => {
    if (currentMonth === new Date(t.date).getMonth() && t.type === "expense") {
      expenseByCategory[t.category] =
        (expenseByCategory[t.category] || 0) + t.amount;
    }
  });
  const budgetData = budgets.map((b) => {
    // if b.category matches t.category, grab value $345 and store as monthlyExpense
    const monthlyExpense = expenseByCategory[b.category] || 0;
    // ...b unpacks 3 properties: category, id, limit
    return {
      ...b,
      monthlyExpense,
      remaining: b.limit - monthlyExpense,
    };
  });
  function handleSubmit() {
    const newBudget = {
      id: Date.now(),
      category: category,
      limit: budgetAmount,
    };
    addBudget(newBudget);
    // reset form
    setBudgetAmount(0);
    setCategory("Housing");
  }
  console.log("array of objects with 3 properties?", budgetData);

  // inefficient code for big data, Big O(n x m), 100 budgets and 1,000 transactions, perform 100,000 operations.
  // filter through transactions for expense and category, unpack and add budget to budgetsData. map through budgets first to compare t.category === b.category
  // const budgetData = budgets.map((b) => {
  //   const monthlyExpense = transactions
  //     .filter(
  //       (t) =>
  //         t.category === b.category &&
  //         currentMonth === new Date(t.date).getMonth() &&
  //         t.type === "expense",
  //     )
  //     .reduce((accumulator, t) => (accumulator += t.amount), 0);
  //   return {
  //     ...b,
  //     monthlyExpense,
  //     remaining: b.limit - monthlyExpense,
  //   };
  // });

  // overall budget calculations: total limit vs total expense
  const totalLimit = budgetData.reduce((sum, b) => (sum += b.limit), 0);
  const totalExpense = transactions
    .filter(
      (t) =>
        t.type === "expense" && new Date(t.date).getMonth() === currentMonth,
    )
    .reduce((accumulator, t) => (accumulator += t.amount), 0);
  return (
    <div>
      <div className="flex items-center justify-between m-5">
        <div>
          <h1 className="text-2xl font-bold">Budgets</h1>
          <p className="text-gray-500">Saved money is not idle money</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-green-500 rounded-md px-2 h-10 text-white mx-5 hover:cursor-pointer"
              variant="outline"
            >
              + Set Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Set Category Budget</DialogTitle>
            </DialogHeader>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1"
            >
              {budgetCategory.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Input
              placeholder="Monthly limit ($)"
              onChange={(e) => setBudgetAmount(Number(e.target.value))}
            />
            <DialogClose className="">
              <Button type="button" onClick={handleSubmit}>
                Save Budget
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-white m-5 rounded-lg p-5 shadow-md">
        <div className="md:flex justify-between items-center">
          <div className="mb-3">
            <p>Overall Budget</p>
            <span className="text-xs text-gray-500">
              ${totalExpense}/${totalLimit}
            </span>
          </div>
          <div className="md:flex justify-between items-center gap-3 group cursor-pointer">
            <span className="inline-flex justify-center items-center text-xs text-green-700 bg-green-100 rounded-md px-2 py-1 ">
              ${totalLimit - totalExpense} saved
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(((totalLimit - totalExpense) / totalLimit) * 100)}%
            </span>
          </div>
        </div>
        <Progress
          value={
            totalExpense > totalLimit ? 100 : (totalExpense / totalLimit) * 100
          }
          indicatorClassName={totalExpense > totalLimit ? "bg-red-600" : ""}
          id="progress-upload"
        />
      </div>
      <div className="sm:justify-center grid md:grid-cols-2 gap-2">
        {budgetData.map((item) => {
          return (
            <div className="bg-white m-5 rounded-lg p-5 shadow-md">
              <div className="md:flex justify-between items-center">
                <div className="mb-3">
                  <p>{item.category}</p>
                  <span className="text-xs text-gray-500">
                    ${item.monthlyExpense}/${item.limit}
                  </span>
                </div>
                <div className="md:flex justify-between items-center gap-3 group cursor-pointer">
                  <span className="inline-flex justify-center items-center text-xs text-green-700 bg-green-100 rounded-md px-2 py-1 ">
                    ${item.remaining} saved
                  </span>
                  {/* group allows user to hover over its parent and respond */}
                  <Trash2
                    className="invisible group-hover:visible bg-red-100 text-red-500 rounded-sm w-6 h-6 px-1"
                    onClick={() => removeBudgets(item.id)}
                  />
                </div>
              </div>
              <Progress
                value={
                  item.monthlyExpense > item.limit
                    ? 100
                    : (item.monthlyExpense / item.limit) * 100
                }
                indicatorClassName={
                  item.monthlyExpense > item.limit ? "bg-red-600" : ""
                }
                id="progress-upload"
              />
            </div>
          );
        })}
      </div>
      {budgetData.length === 0 && (
        <div>
          <p>No budgets set yet!</p>
        </div>
      )}
    </div>
  );
}
