export default async function (symbol: string, optionType: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/market/getOptionChainTemplate?symbol=${symbol}&optionType=${optionType.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
