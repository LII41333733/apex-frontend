export default async function (option: string, price: number) {
    try {
        // Options for the fetch request
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ option, price }),
        };

        const response = await fetch(
            'http://localhost:8080/api/trade/placeTrade',
            options
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
