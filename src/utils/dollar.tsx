export const dollar = (amount: number, roundValue = true) => {
  const value = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return roundValue ? value.slice(0, -3) : value;
};
