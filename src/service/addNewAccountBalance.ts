import { AccountBalance } from '@/interfaces/AccountBalance';

export default async function (accountBalance: AccountBalance) {
    try {
        // Options for the fetch request
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountBalance),
        };

        const response = await fetch(
            'http://localhost:8080/api/account/addNewAccountBalance',
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
