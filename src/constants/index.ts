export enum WebSocketData {
  BALANCE = "balance",
  QUOTE = "quote",
  ORDER_SUMMARY = "orderSummary",
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
}
