import convertTickerStringToObject from "./convertTickerStringToObject";

// Function to convert ticker to object
export default function (ticker: string) {
  if (!ticker) {
    return "";
  }

  const { type, strike } = convertTickerStringToObject(ticker);
  // return `${underlying} ${strike}${type[0]}`;
  return `${strike}${type[0]}`;
}
