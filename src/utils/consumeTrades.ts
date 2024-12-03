import { TradeState } from '@/state/tradeSlice';
import Trade from '@/types/Trade';
import { PayloadAction } from '@reduxjs/toolkit';

export default (
    state: TradeState,
    { payload: trades }: PayloadAction<Trade[]>
) => {
    state.trades = trades;
    state.positivePlTrades = trades.filter((e) => e.pl >= 0);
    state.negativePlTrades = trades.filter((e) => e.pl < 0);
    // console.log(`-----------`);
    // console.log(`ALL TRADES`);
    // console.log(trades);
    // console.log(`-----------`);
    // console.log(`LAST 20 TRADES`);
    // console.log(trades.slice(-20));
    // console.log(`-----------`);
    // console.log(`TRADES BY DAY`);
    // console.log(groupTradesByDay(trades));
    // console.log(`-----------`);
    // console.log(`TRADES BY WEEK`);
    // console.log(groupTradesByWeek(trades));
    // console.log(`-----------`);
    // console.log(`TRADES BY MONTH`);
    // console.log(groupTradesByMonth(trades));
    // console.log(`-----------`);
    // console.log(`TRADES BY YEAR`);
    // console.log(groupTradesByYear(trades));
    // console.log(`-----------`);
    // console.log(`LAST FILLED BEFORE TODAY`);
    // console.log(getLastFilledTradeBeforeToday(trades));
    state.tradesByDay = groupTradesByDay(trades);
    state.tradesByWeek = groupTradesByWeek(trades);
    state.tradesByMonth = groupTradesByMonth(trades);
    state.tradesByYear = groupTradesByYear(trades);
    state.lastFilledBeforeToday = getLastFilledTradeBeforeToday(trades);
    state.last20Trades = trades.slice(-20);
};

const getLastFilledTradeBeforeToday = (trades: Trade[]): Trade | null => {
    // Helper to determine if a date falls on a specific day
    const isSameDay = (date1: Date, date2: Date): boolean => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    // Start from yesterday
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    // Stop after checking all trades' days
    const oldestDate = trades.reduce((minDate, trade) => {
        return new Date(trade.closeDate) < minDate
            ? new Date(trade.closeDate)
            : minDate;
    }, new Date());

    while (currentDate >= oldestDate) {
        // Filter trades that match the currentDate and are 'FILLED'
        const filteredTrades = trades.filter(
            (trade) =>
                trade.status === 'FILLED' &&
                isSameDay(new Date(trade.closeDate), currentDate)
        );

        // Find the trade with the latest closeDate in the filtered trades
        if (filteredTrades.length > 0) {
            return filteredTrades.reduce((latestTrade, trade) => {
                return new Date(trade.closeDate) >
                    new Date(latestTrade.closeDate)
                    ? trade
                    : latestTrade;
            });
        }

        // Move to the previous day
        currentDate.setDate(currentDate.getDate() - 1);
    }

    // If no trade is found, return null
    return null;
};

const groupTradesByDay = (trades: Trade[]): { [day: string]: Trade[] } => {
    return trades.reduce((acc: { [day: string]: Trade[] }, trade) => {
        // Format the day as "YYYY-MM-DD"
        const dayKey = trade.openDate.split('T')[0];

        // Initialize the array for the day if it doesn't exist
        if (!acc[dayKey]) {
            acc[dayKey] = [];
        }

        // Add the trade to the corresponding day group
        acc[dayKey].push(trade);

        return acc;
    }, {});
};

const groupTradesByYear = (trades: Trade[]): { [year: string]: Trade[] } => {
    return trades.reduce((acc: { [year: string]: Trade[] }, trade) => {
        const year = trade.openDate.slice(0, 4); // Extract year from openDate
        if (!acc[year]) {
            acc[year] = []; // Initialize the array if the year is not yet in the object
        }
        acc[year].push(trade); // Add the trade to the corresponding year
        return acc;
    }, {} as { [year: string]: Trade[] });
};

const groupTradesByWeek = (
    trades: Trade[]
): {
    [weekStart: string]: Trade[];
} => {
    if (trades.length === 0) {
        return {}; // Handle empty array
    }

    // Get the start date of the first trade's "week"
    const firstTradeDate = trades[0].openDate;
    const weekStartRef = new Date(firstTradeDate);
    weekStartRef.setHours(0, 0, 0, 0); // Clear time

    // Helper to calculate the corresponding week key for a date based on the first trade's week start
    const getWeekStart = (date: Date): string => {
        const diffInDays = Math.floor(
            (date.getTime() - weekStartRef.getTime()) / (1000 * 60 * 60 * 24)
        );
        const weekOffset = Math.floor(diffInDays / 7); // Calculate the week offset
        const weekStart = new Date(weekStartRef);
        weekStart.setDate(weekStart.getDate() + weekOffset * 7); // Move to the corresponding week start
        return weekStart.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

    // Group trades by week
    return trades.reduce((acc: { [weekStart: string]: Trade[] }, trade) => {
        const weekStart = getWeekStart(new Date(trade.openDate));
        if (!acc[weekStart]) {
            acc[weekStart] = [];
        }
        acc[weekStart].push(trade);
        return acc;
    }, {});
};

const groupTradesByMonth = (trades: Trade[]): { [month: string]: Trade[] } => {
    return trades.reduce((acc: { [month: string]: Trade[] }, trade) => {
        const openDate = new Date(trade.openDate);
        const monthKey = `${openDate.getFullYear()}-${String(
            openDate.getMonth() + 1
        ).padStart(2, '0')}`;

        // Initialize the array for the month if it doesn't exist
        if (!acc[monthKey]) {
            acc[monthKey] = [];
        }

        // Add the trade to the corresponding month group
        acc[monthKey].push(trade);

        return acc;
    }, {});
};
