import { TradeState } from '@/state/tradeSlice';
import Trade from '@/types/Trade';
import { PayloadAction } from '@reduxjs/toolkit';
import { parseISO, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

export default (
    state: TradeState,
    { payload: trades }: PayloadAction<Trade[]>
) => {
    state.trades = trades;
    state.todaysTrades = getTradesToday(trades);
    state.tradesByDay = groupTradesByDay(trades);
    state.tradesByMonth = groupTradesByMonth(trades);
    state.tradesByYear = groupTradesByYear(trades);
    state.tradesByRiskType = groupTradesByRiskType(trades);
    state.lastFilledBeforeToday = getLastFilledTradeBeforeToday(trades);
    state.last20Trades = trades.slice(-20);
    state.thisWeeksTrades = getTradesWeek(trades);
    state.thisMonthsTrades = getCurrentMonthTrades(trades);
    state.thisYearsTrades = getCurrentYearTrades(trades);
    state.tradesByWeek = groupTradesByWeek(trades);
    state.statDailyTotalPl = state.todaysTrades.reduce((p, c) => p + c.pl, 0);
    state.statDailyHighPl = trades.sort((a, b) => b.pl - a.pl)[0].pl;
    state.statDailyAveragePl = calculateAverage(trades, 'pl');
    state.statWeeklyTotalPl = state.thisWeeksTrades.reduce(
        (p, c) => p + c.pl,
        0
    );
    state.statWeeklyHighPl = getHighestPl(state.tradesByWeek);
    state.statWeeklyAveragePl = calculateAveragePl(state.tradesByWeek);

    state.statMonthlyTotalPl = state.thisMonthsTrades.reduce(
        (p, c) => p + c.pl,
        0
    );
    state.statMonthlyHighPl = getHighestPl(state.tradesByMonth);
    state.statMonthlyAveragePl = calculateAveragePl(state.tradesByMonth);

    state.statYearlyTotalPl = state.thisYearsTrades.reduce(
        (p, c) => p + c.pl,
        0
    );
    state.statYearlyHighPl = getHighestPl(state.tradesByYear);
    state.statYearlyAveragePl = calculateAveragePl(state.tradesByYear);

    state.positivePlTrades = trades.filter((e) => e.pl >= 0);
    state.negativePlTrades = trades.filter((e) => e.pl < 0);
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

const groupTradesByRiskType = (
    trades: Trade[]
): { [riskType: string]: Trade[] } => {
    return trades.reduce((acc: { [riskType: string]: Trade[] }, trade) => {
        const riskType = trade.riskType;
        if (!acc[riskType]) {
            acc[riskType] = [];
        }
        acc[riskType].push(trade);
        return acc;
    }, {} as { [riskType: string]: Trade[] });
};

type Trade = {
    id: number;
    fillOrderId: number | null;
    preTradeBalance: number;
    postTradeBalance: number;
    optionSymbol: string;
    symbol: string;
    fillPrice: number;
    initialAsk: number;
    openDate: string; // ISO date string
    closeDate: string; // ISO date string
    maxPrice: number;
    pl: number;
    tradeAmount: number;
    lastPrice: number;
    finalAmount: number;
    status: string;
    trimStatus: number;
    stopPrice: number;
    stopPriceFinal: number;
    quantity: number;
    runnersQuantity: number;
    stopPercentage: number;
    runnersFloorIsActive: boolean;
    riskType: string;
};

function getTradesToday(trades: Trade[]): Trade[] {
    const today = new Date();
    const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );
    const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
    );

    return trades.filter((trade) => {
        const openDate = new Date(trade.openDate);
        const closeDate = new Date(trade.closeDate);
        return (
            (openDate >= startOfDay && openDate < endOfDay) ||
            (closeDate >= startOfDay && closeDate < endOfDay)
        );
    });
}

function getTradesWeek(trades: Trade[]): Trade[] {
    const now = new Date();
    const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 0 }); // Week starts on Sunday
    const endOfCurrentWeek = endOfWeek(now, { weekStartsOn: 0 });

    return trades.filter((trade) => {
        const tradeOpenDate = parseISO(trade.openDate);
        return isWithinInterval(tradeOpenDate, {
            start: startOfCurrentWeek,
            end: endOfCurrentWeek,
        });
    });
}

function calculateAverage(trades: Trade[], property: string): number {
    if (trades.length === 0) return 0;
    const total = trades.reduce((sum, trade) => sum + trade[property], 0);
    return total / trades.length;
}

interface WeeklyTrades {
    [date: string]: Trade[];
}

function calculateAveragePl(weeklyTrades: WeeklyTrades): number {
    const totalPL = Object.values(weeklyTrades).reduce((acc, trades) => {
        const weekPL = trades.reduce((weekAcc, trade) => weekAcc + trade.pl, 0);
        return acc + weekPL;
    }, 0);

    const weekCount = Object.keys(weeklyTrades).length;
    return weekCount === 0 ? 0 : totalPL / weekCount;
}

function getHighestPl(trades: WeeklyTrades): number {
    let highestWeek = null;
    let highestPL = -Infinity;

    for (const [week, weekTrades] of Object.entries(trades)) {
        const totalPL = weekTrades.reduce(
            (acc, trade) => acc + (trade.pl || 0),
            0
        );

        if (totalPL > highestPL) {
            highestPL = totalPL;
            highestWeek = week;
        }
    }

    return highestWeek !== null ? highestPL : 0;
}

function getCurrentMonthTrades(trades: Trade[]): Trade[] {
    const now = new Date();
    const currentMonth = now.getMonth(); // Months are zero-indexed
    const currentYear = now.getFullYear();

    return trades.filter((trade) => {
        const openDate = new Date(trade.openDate);
        return (
            openDate.getMonth() === currentMonth &&
            openDate.getFullYear() === currentYear
        );
    });
}

function getCurrentYearTrades(trades: Trade[]): Trade[] {
    const currentYear = new Date().getFullYear();

    return trades.filter((trade) => {
        const openYear = new Date(trade.openDate).getFullYear();
        const closeYear = new Date(trade.closeDate).getFullYear();

        // Check if either openDate or closeDate falls within the current year
        return openYear === currentYear || closeYear === currentYear;
    });
}

// Example usage:
const trades: Trade[] = [
    {
        id: 271210442701,
        fillOrderId: null,
        preTradeBalance: 561192,
        postTradeBalance: 621540,
        optionSymbol: 'IWM240920P00565000',
        symbol: 'IWM',
        fillPrice: 1.19,
        initialAsk: 1.19,
        openDate: '2024-12-27T09:30:00',
        closeDate: '2024-12-27T16:00:00',
        maxPrice: 4.58,
        pl: 60348,
        tradeAmount: 22372,
        lastPrice: 4.4,
        finalAmount: 82720,
        status: 'FILLED',
        trimStatus: 1,
        stopPrice: 0.02,
        stopPriceFinal: 4.4,
        quantity: 188,
        runnersQuantity: 188,
        stopPercentage: 0,
        runnersFloorIsActive: false,
        riskType: 'Hero',
    },
];
