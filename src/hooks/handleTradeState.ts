import placeTrade from '@/service/placeTrade';

export default () => {
    // Function to update the Map
    const handlePlaceTrade = (option: string, price: number) => {
        placeTrade(option, price);
    };

    return {
        handlePlaceTrade,
    };
};
