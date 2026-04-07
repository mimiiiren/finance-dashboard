import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pie, PieChart, Tooltip, ResponsiveContainer, Cell } from "recharts";

import { useTransactionStore } from "@/store/store";
type Props = {
  currentMonth: number;
};

export function CategoryPieChart({ currentMonth }: Props) {
  const transactions = useTransactionStore((state) => state.transactions);
  const byCategory: Record<string, number> = {};
  const expenses = transactions.filter(
    (t) => currentMonth === new Date(t.date).getMonth() && t.type === "expense",
  );
  expenses.forEach(
    (t) => (byCategory[t.category] = (byCategory[t.category] || 0) + t.amount),
  );
  const categoryData = Object.entries(byCategory).map(([category, value]) => ({
    category,
    monthlyExpense: value,
  }));
  // calculate total expenses for percent
  const total = expenses.reduce(
    (accumulator, item) => (accumulator += item.amount),
    0,
  );
  const chartData = categoryData.map((item) => {
    const percent = (item.monthlyExpense / total) * 100;
    return {
      ...item,
      percent: Math.round(percent),
    };
  });
  const colors = [
    "#0088FE",
    "#9e3f9e",
    "#FFBB28",
    "#F44236",
    "#00C49F",
    "#FF8042",
  ];
  const customToolTip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <p className="text-gray-500 border rounded-lg p-3">
          {payload[0].name}: ${payload[0].value}
        </p>
      );
    }
    return null;
  };
  return (
    <div>
      <Card className="flex flex-col">
        <CardHeader className="items-center">
          <CardTitle>Spending by Category</CardTitle>
          <CardDescription>This month</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] w-full">
          {chartData.length === 0 ? (
            <p className="text-center text-lg">
              No expenses this month — nice work! 🎉
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <div className="flex items-center justify-between">
                <PieChart
                  width={400}
                  height={400}
                  style={{
                    width: "300px",
                    height: "40vh",
                    aspectRatio: 0,
                  }}
                >
                  <Pie
                    cx="50%"
                    cy="50%"
                    innerRadius="30%"
                    outerRadius="50%"
                    data={chartData}
                    dataKey="monthlyExpense"
                    nameKey="category"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={index} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={customToolTip} />
                </PieChart>
                <div className="flex-1">
                  {chartData.map((item) => (
                    <div className="flex items-center gap-2 m-5">
                      <p className="w-[100px] text-gray-500">{item.category}</p>
                      <p className="w-[50px]">${item.monthlyExpense}</p>
                      <span className="text-xs text-gray-400">
                        {item.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
