export enum SYMBOLS {
  SPY = "SPY",
  QQQ = "QQQ",
  IWM = "IWM",
}

export enum WebSocketData {
  BALANCE = "balance",
  QUOTE = "quote",
  ORDER_SUMMARY = "orderSummary",
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

export enum Displays {
  POSITIONS = "Positions",
  CHAIN = "Options Chain",
  TRADES = "Trades",
}

export enum OrderStatuses {
  ALL = "All",
  CANCELED = "Canceled",
  PENDING = "Pending",
  OPEN = "Open",
  FILLED = "Filled",
}

export enum OrderDataStatuses {
  CANCELED = "canceled",
  PENDING = "pending",
  OPEN = "open",
  FILLED = "filled",
  REJECTED = "rejected",
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
