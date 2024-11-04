import { WebSocketData } from '@/constants';

type AppStateType = {
    balance: {
        type: WebSocketData;
        unsettledFunds: number;
        cashAvailable: number;
        marketValue: number;
        openPl: number;
        closePl: number;
        pendingCash: number;
        unclearedFunds: number;
    };
    [key: string]: any;
};

export default AppStateType;
