export default async function (symbol: string, optionType: string) {
    try {
        // Options for the fetch request
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ symbol, optionType }),
        };

        const response = await fetch(
            'http://localhost:8080/api/trade/placeSandboxTrade',
            options
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server Error:', errorData); // Log the error response from the server
            console.error(errorData.message);
            return errorData; // Return or throw the error as needed
        }

        return response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Fetch Error:', error.message);
        } else {
            console.error('Unexpected Error:', error);
        }
        throw error; // Optionally rethrow the error  }
    }
}
