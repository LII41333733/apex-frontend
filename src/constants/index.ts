export enum SYMBOLS {
  SPY = "SPY",
  QQQ = "QQQ",
  IWM = "IWM",
  GOOGL = "GOOGL",
  AAPL = "AAPL",
  AMD = "AMD",
  TSLA = "TSLA",
  NVDA = "NVDA",
  PYPL = "PYPL",
  SMCI = "SMCI",
  AFRM = "AFRM",
  META = "META",
  PLTR = "PLTR",
  AMZN = "AMZN",
  CHWY = "CHWY",
}

export const MINI_SYMBOLS: SYMBOLS[] = Object.values(SYMBOLS).slice(3);

export enum WebSocketData {
  BALANCE = "balance",
  QUOTE = "quote",
  ORDER_SUMMARY = "orderSummary",
  TRADE_SUMMARY = "tradeSummary",
  TRADES = "trades",
  SPY = SYMBOLS.SPY,
  QQQ = SYMBOLS.QQQ,
  IWM = SYMBOLS.IWM,
}

export enum AppStateKey {
  activeSymbol = "activeSymbol",
}

export enum OptionType {
  CALL = "Call",
  PUT = "Put",
}

export enum RiskType {
  BASE = "Base",
  LOTTO = "Lotto",
}

export enum TradeLeg {
  FILL,
  TRIM1,
  TRIM2,
  STOP,
}

export enum Displays {
  POSITIONS = "Positions",
  CHAIN = "Options Chain",
  TRADES = "Trades",
}

export enum OrderStatuses {
  ALL = "All",
  CANCELED = "Canceled",
  REJECTED = "Rejected",
  PENDING = "Pending",
  OPEN = "Open",
  FILLED = "Filled",
  RUNNERS = "Runners",
}

export enum TradeStatus {
  PENDING = "PENDING",
  OPEN = "OPEN",
  RUNNERS = "RUNNERS",
  FILLED = "FILLED",
  FINALIZED = "FINALIZED",
  CANCELED = "CANCELED",
  REJECTED = "REJECTED",
}

export enum ValueStatus {
  POSITIVE = "POSITIVE",
  NEUTRAL = "NEUTRAL",
  NEGATIVE = "NEGATIVE",
}

export enum ValueIcon {
  POSITIVE = "▲",
  NEGATIVE = "▼",
  NEUTRAL = "•",
}

export enum ValueOperator {
  POSITIVE = "+",
  NEGATIVE = "-",
  NEUTRAL = "",
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
    textColor: "text-trade-green",
  },
  [ValueStatus.NEGATIVE]: {
    icon: ValueIcon.NEGATIVE,
    operator: ValueOperator.NEGATIVE,
    textColor: "text-trade-red",
  },
  [ValueStatus.NEUTRAL]: {
    icon: ValueIcon.NEUTRAL,
    operator: ValueOperator.NEUTRAL,
    textColor: "text-trade-neutral",
  },
};

export enum DashboardView {
  HOME,
  TRADES,
  ANALYTICS,
  VISION,
}
