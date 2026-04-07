import {
  CircleDollarSign,
  BanknoteArrowUp,
  BanknoteArrowDown,
  PiggyBank,
} from "lucide-react";
import { useTransactionStore } from "../store/store";
import { IncomeExpenseChart } from "@/components/dashboard/IncomeExpenseChart";
import { CategoryPieChart } from "@/components/dashboard/CategoryPieChart";

export default function Dashboard() {
  const transactions = useTransactionStore((state) => state.transactions);
  // get date for now, then compare its month to t.date as date object
  const currentMonth = new Date().getMonth();
  // create an array of t.amount
  const totalIncome = transactions
    .filter(
      (t) =>
        t.type === "income" && new Date(t.date).getMonth() === currentMonth,
    )
    .reduce((accumulator, t) => (accumulator += t.amount), 0);
  const totalExpense = transactions
    .filter(
      (t) =>
        t.type === "expense" && new Date(t.date).getMonth() === currentMonth,
    )
    .reduce((accumulator, t) => (accumulator += t.amount), 0);
  const totalBalance = totalIncome + -totalExpense;
  return (
    // space-y tells children to push apart
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl m-5 mb-0 font-bold">Dashboard</h1>
      <p className="mx-5 text-gray-500">
        Your financial overview at a glance. Maximize your money and your life.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-5 text-gray-500">
        <div className="border rounded-lg p-4 bg-white text-base/9">
          <div className="flex justify-between items-center">
            <p>Total Balance</p>
            <CircleDollarSign className="rounded-sm p-1 w-8 h-8 text-yellow-500" />
          </div>
          <h3 className="text-black text-xl font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(totalBalance)}
          </h3>
          <span className="text-xs text-gray-400">This month</span>
        </div>
        <div className="border rounded-lg p-4 bg-white text-base/9">
          <div className="flex justify-between items-center">
            <p>Income</p>
            <BanknoteArrowUp className="rounded-sm p-1 w-8 h-8 bg-green-100 text-green-500" />
          </div>
          <h3 className="text-black text-xl font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(totalIncome)}
          </h3>
          <span className="text-xs text-gray-400">This month</span>
        </div>
        <div className="border rounded-lg p-4 bg-white text-base/9">
          <div className="flex justify-between items-center">
            <p>Expense</p>
            <BanknoteArrowDown className="bg-red-100 text-red-500 rounded-sm p-1 w-8 h-8" />
          </div>
          <h3 className="text-black text-xl font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(totalExpense)}
          </h3>
          <span className="text-xs text-gray-400">This month</span>
        </div>
        <div className="border rounded-lg p-4 bg-white text-base/9">
          <div className="flex justify-between items-center">
            <p>Savings Rate</p>
            <PiggyBank className="bg-red-100 text-red-500 rounded-sm p-1 w-8 h-8" />
          </div>
          <h3 className="text-black text-xl font-bold">
            {totalIncome > 0
              ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
              : 0}
            %
          </h3>
          <span className="text-xs text-gray-400">Of income saved</span>
        </div>
      </div>
      {/* charts */}
      <div className="md:grid md:grid-cols-2 gap-5 mx-5 space-y-6">
        <IncomeExpenseChart />
        <CategoryPieChart currentMonth={currentMonth} />
      </div>
    </div>
  );
}
