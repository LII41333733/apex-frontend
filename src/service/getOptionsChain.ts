export default async function (symbol: string, optionType: string) {
  try {
    const response = await fetch();

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return (await response.json()) ?? [];
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
