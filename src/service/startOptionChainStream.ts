export default async function () {
    try {
        const response = await fetch(
            `http://localhost:8080/api/market/startOptionChainStream`
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
