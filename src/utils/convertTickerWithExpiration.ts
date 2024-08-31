export default function (ticker: string) {
  if (!ticker) {
    return "";
  }
  // Extract the symbol (first 3 characters)
  const symbol = ticker.slice(0, 3);

  // Extract and format the date (characters 5 to 9)
  const month = ticker.slice(5, 7).replace(/^0/, ""); // Extract and remove leading zero from month
  const day = ticker.slice(7, 9).replace(/^0/, ""); // Extract and remove leading zero from day
  const formattedDate = `${month}/${day}`;

  // Extract the option type (character 10)
  const optionType = ticker[9]; // 'C' for Call or 'P' for Put

  // Extract the relevant part of the strike price (characters 12 to 16)
  // The strike price is "00565", we want to extract and format it as 565
  const strikePrice = parseInt(ticker.slice(12, 15), 10);

  // Construct the final formatted string
  return `${symbol} ${strikePrice}${optionType} ${formattedDate}`;
}
