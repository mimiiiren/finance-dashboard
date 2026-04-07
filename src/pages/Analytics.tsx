import { useState } from "react";
import { useTransactionStore } from "@/store/store";
import { useMonthlyTransactions } from "@/hooks/useMonthlyTransactions";
import IncomeExpenseLineChart from "@/components/LineChartIncomeExpense";
export default function Analytics() {
  const transactions = useTransactionStore((state) => state.transactions);
  const { monthlyDataArray, threeMonths, sixMonths, twelveMonths } =
    useMonthlyTransactions();

  const [selectedPeriod, setSelectedPeriod] = useState<3 | 6 | 12>(6);

  const dataMap = { 3: threeMonths, 6: sixMonths, 12: twelveMonths };
  const chartData = dataMap[selectedPeriod];

  const totals = transactions.reduce(
    (accumulator, t) => {
      if (t.type === "income") {
        accumulator.income += t.amount;
      } else if (t.type === "expense") {
        accumulator.expense += t.amount;
      }
      return accumulator;
    },
    { income: 0, expense: 0 },
  );

  const avgExpense = totals.expense / monthlyDataArray.length;

  return (
    <div>
      <div className="m-5">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-gray-500">
          Spending patterns and financial insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-5 text-gray-500">
        <div className="border rounded-lg p-4 bg-white text-base/9">
          <p>Total Income</p>
          <h3 className="text-black text-xl font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(totals.income)}
          </h3>
        </div>
        <div className="border rounded-lg p-4 bg-white text-base/9">
          <p>Total Expenses</p>
          <h3 className="text-black text-xl font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(totals.expense)}
          </h3>
        </div>
        <div className="border rounded-lg p-4 bg-white text-base/9">
          <p>Avg Monthly Expense</p>
          <h3 className="text-black text-xl font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(avgExpense)}
          </h3>
        </div>
      </div>
      <div className="flex justify-end mr-5">
        <select
          value={selectedPeriod}
          onChange={(e) =>
            setSelectedPeriod(Number(e.target.value) as 3 | 6 | 12)
          }
          className="border rounded-md px-3 py-1 text-sm text-gray-60 bg-white mt-5"
        >
          <option value={3}>3 months</option>
          <option value={6}>6 months</option>
          <option value={12}>12 months</option>
        </select>
      </div>
      <IncomeExpenseLineChart chartData={chartData} />
    </div>
  );
}
