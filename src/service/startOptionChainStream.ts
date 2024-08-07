export default async function () {
  try {
    const response = await fetch(
      `http://localhost:8080/api/market/startOptionChainStream`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
