export const ONE_MILLION = 1_000_000;

export enum SYMBOLS {
    SPY = 'SPY',
    QQQ = 'QQQ',
    IWM = 'IWM',
}

export const MINI_SYMBOLS: SYMBOLS[] = Object.values(SYMBOLS).slice(3);

export enum WebSocketData {
    BALANCE = 'BALANCE',
    DEMO_BALANCE = 'DEMO_BALANCE',
    DEMO_PORTFOLIO = 'DEMO_PORTFOLIO',
    DEMO_TRADES = 'DEMO_TRADES',
    POSITIONS = 'POSITIONS',
    QUOTE = 'QUOTE',
    SYMBOLS = 'SYMBOLS',
    TRADES = 'TRADES',
}

export enum AppStateKey {
    activeSymbol = 'activeSymbol',
}

export enum OptionType {
    CALL = 'Call',
    PUT = 'Put',
}

export enum RiskType {
    BASE = 'BASE',
    LOTTO = 'LOTTO',
    HERO = 'HERO',
    VISION = 'VISION',
}

export enum TradeLeg {
    FILL,
    TRIM1,
    TRIM2,
    STOP,
}

export enum Displays {
    PORTFOLIO = 'Portfolio',
    CHAIN = 'Options Chain',
    POSITIONS = 'Positions',
    TRADES = 'Trades',
    ANALYTICS = 'Analytics',
    VISION = 'Vision',
}

export enum OrderStatuses {
    ALL = 'All',
    CANCELED = 'Canceled',
    REJECTED = 'Rejected',
    PENDING = 'Pending',
    OPEN = 'Open',
    FILLED = 'Filled',
    RUNNERS = 'Runners',
}

export enum TradeStatus {
    ALL = 'ALL',
    PENDING = 'PENDING',
    OPEN = 'OPEN',
    RUNNERS = 'RUNNERS',
    FILLED = 'FILLED',
    FINALIZED = 'FINALIZED',
    CANCELED = 'CANCELED',
    REJECTED = 'REJECTED',
}

export enum ValueStatus {
    POSITIVE = 'POSITIVE',
    NEUTRAL = 'NEUTRAL',
    NEGATIVE = 'NEGATIVE',
}

export enum ValueIcon {
    POSITIVE = '▲',
    NEGATIVE = '▼',
    NEUTRAL = '•',
}

export enum ValueOperator {
    POSITIVE = '+',
    NEGATIVE = '-',
    NEUTRAL = '',
}

export enum Alerts {
    REJECTED,
    MODIFIED,
    PLACED,
    CANCELED,
    OPENED,
    HOD,
    STOPPED,
    TRIMMED1,
    TRIMMED2,
    RUNNERS,
}

export interface ValuesLibData {
    icon: ValueIcon;
    operator: ValueOperator;
    textColor: string;
}

export const ValuesLib = {
    [ValueStatus.POSITIVE]: {
        icon: ValueIcon.POSITIVE,
        operator: ValueOperator.POSITIVE,
        textColor: 'text-trade-green',
    },
    [ValueStatus.NEGATIVE]: {
        icon: ValueIcon.NEGATIVE,
        operator: ValueOperator.NEGATIVE,
        textColor: 'text-trade-red',
    },
    [ValueStatus.NEUTRAL]: {
        icon: ValueIcon.NEUTRAL,
        operator: ValueOperator.NEUTRAL,
        textColor: 'text-trade-neutral',
    },
};

export enum DashboardView {
    HOME,
    TRADES,
    ANALYTICS,
    VISION,
}
