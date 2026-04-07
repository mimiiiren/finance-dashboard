import {
  CartesianGrid,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { useMonthlyTransactions } from "@/hooks/useMonthlyTransactions";

export function IncomeExpenseChart() {
  const { monthlyDataArray } = useMonthlyTransactions();
  const { sixMonths } = useMonthlyTransactions();
  return (
    <div className="sm:mb-5">
      <Card>
        <CardHeader>
          <CardTitle>Income vs Expenses</CardTitle>
          <CardDescription>Showing the last six months</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] w-full">
          {monthlyDataArray.length === 0 ? (
            <p className="text-center text-lg">
              No activity yet — let's change that! 💸
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart accessibilityLayer data={sixMonths}>
                <CartesianGrid strokeDasharray="4 8" />
                <XAxis dataKey="month" tickFormatter={(v) => v.slice(0, 3)} />
                <YAxis tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip />
                <Area
                  dataKey="income"
                  type="natural"
                  fill="green"
                  stroke="green"
                  fillOpacity={0.2}
                  dot={false}
                />
                <Area
                  dataKey="expense"
                  type="natural"
                  fill="red"
                  stroke="red"
                  fillOpacity={0.2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
