import { useMemo } from "react";
import { useTransactionStore } from "@/store/store";
import { formatMonth } from "@/lib/utils";

type MonthlyTotals = {
  [key: string]: { income: number; expense: number };
};

export const useMonthlyTransactions = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  // sort raw date first
  const sortedTransactions = transactions.sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  // if transactions hasn't changed, don't do math again, just give me result from last time
  const monthlyDataArray = useMemo(() => {
    // group into an object
    const monthlyTotals = sortedTransactions.reduce((accumulator, t) => {
      const month = formatMonth(t.date);
      if (accumulator[month]) {
        if (t.type === "income") {
          accumulator[month].income += t.amount;
        } else {
          accumulator[month].expense += t.amount;
        }
      } else {
        if (t.type === "income") {
          accumulator[month] = { income: t.amount, expense: 0 };
        } else {
          accumulator[month] = { income: 0, expense: t.amount };
        }
      }
      return accumulator;
      // empty object is the value, so use as keyword for types AFTER a value
    }, {} as MonthlyTotals);
    // transform into array of objects for chart data
    // array destructuring extract item[0], item[1] and rename as month and values
    return Object.entries(monthlyTotals).map(([month, values]) => ({
      month,
      income: values.income,
      expense: values.expense,
    }));
  }, [transactions]);

  // generate each month depending on filter. remember months = 0 index
  function generateMonths(count: number) {
    let allMonths = [];
    for (let i = count - 1; i >= 0; i--) {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - i);
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });
      allMonths.push(formattedDate);
    }
    // allMonths = ["Mar 26", "Feb 26"] change to array of objects [{Mar 26: 0}, {Feb 26: 0}]
    const completeMonthsData = allMonths.map((allM) => {
      const found = monthlyDataArray.find((m) => m.month === allM);
      //   if m.month === Mar 26, then unpack that single object's income and expense
      if (found) {
        return { ...found };
      } else {
        return {
          month: allM,
          income: 0,
          expense: 0,
        };
      }
    });
    return completeMonthsData;
  }
  const threeMonths = generateMonths(3);
  const sixMonths = generateMonths(6);
  const twelveMonths = generateMonths(12);
  return {
    monthlyDataArray,
    threeMonths,
    sixMonths,
twelveMonths,  
  };
};
