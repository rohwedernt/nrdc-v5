export function truncateDecimalsIfWhole(num: number | string): string | number {
  const parsedNum = typeof num === "number" ? num : parseFloat(num);
  
  if (isNaN(parsedNum)) {
    throw new Error("Invalid input: Input must be a number or a string representing a number.");
  }

  return parsedNum % 1 === 0 ? parsedNum.toFixed(0) : parsedNum;
}

export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
