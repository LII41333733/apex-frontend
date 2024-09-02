export const formatToUSD = (amount: number) => {
  // Round the amount to the nearest dollar
  const roundedAmount = Math.round(amount);

  // Format the rounded amount to USD
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(roundedAmount);
};
