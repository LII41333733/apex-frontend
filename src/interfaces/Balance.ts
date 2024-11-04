export default interface Balance {
    unsettledFunds: number;
    cashAvailable: number;
    marketValue: number;
    openPl: number;
    closePl: number;
    pendingCash: number;
    unclearedFunds: number;
}
