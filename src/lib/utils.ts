import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
  // format date helper function
  export const formatDate = (dateString: string) => {
    const dataObj = new Date(dateString);
    return dataObj.toLocaleDateString("en-US", options);
  };
//  returns only the month in like Mar, Apr for income expense chart
export const formatMonth = (dateString: string) => {
  // split by dashes -, const [year, month, day] = ["2026", "03", "01"]
  // convert to number for easy calculations
  const [year, month, day] = dateString.split("-").map(Number);
  const dataObj = new Date(year, month - 1, day);
    return dataObj.toLocaleDateString("en-US", {month:"short", year: "2-digit"});
  }
  export const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };