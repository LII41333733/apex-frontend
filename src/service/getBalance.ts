export default async function () {
    try {
        const response = await fetch(
            'http://localhost:8080/api/account/getBalance'
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
