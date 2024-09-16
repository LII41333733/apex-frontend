export const dollar = (amount: number) => {
  // Format the rounded amount to USD
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
