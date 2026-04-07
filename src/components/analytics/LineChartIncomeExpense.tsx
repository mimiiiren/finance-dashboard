import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type MonthData = {
  month: string;
  income: number;
  expense: number;
};

type Props = {
  chartData: MonthData[];
};

export default function IncomeExpenseLineChart({ chartData }: Props) {
  if (chartData.every((d) => d.income === 0 && d.expense === 0)) {
    return (
      <p className="text-center text-gray-400 py-20">
        No transactions yet — your story is just getting started! 💸
      </p>
    );
  }

  return (
    <div className="bg-white m-5 rounded-lg p-5 border ">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="4 8" />
          <XAxis dataKey="month" tickFormatter={(v) => v.slice(0, 3)} />
          <YAxis tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip />
          <Line dataKey="income" stroke="green" dot={false} />
          <Line dataKey="expense" stroke="red" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
