// Function to convert ticker to object
export default function (ticker: string) {
  // Find the index of the first digit to separate the underlying asset
  const firstDigitIndex = ticker.search(/\d/);
  const underlying = ticker.slice(0, firstDigitIndex);

  // Extract expiration date using the index found
  const year = "20" + ticker.slice(firstDigitIndex, firstDigitIndex + 2);
  const month = ticker.slice(firstDigitIndex + 2, firstDigitIndex + 4);
  const day = ticker.slice(firstDigitIndex + 4, firstDigitIndex + 6);

  // Extract option type
  const type =
    ticker.slice(firstDigitIndex + 6, firstDigitIndex + 7) === "C"
      ? "Call"
      : "Put";

  // Extract and format strike price
  const strike = parseInt(ticker.slice(firstDigitIndex + 7)) / 1000;

  // Return the constructed object
  return {
    underlying,
    expirationDate: `${year}-${month}-${day}`,
    type,
    strike,
  };
}
