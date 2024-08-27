import React from "react";
import store from "./state/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import BalanceBar from "./components/BalanceBar";
import WebSocketComponent from "./components/WebSocketComponent";
import OptionsChain from "./components/OptionsChain";
import SymbolSelector from "./components/SymbolSelector";
import handleOptionChainState from "./hooks/handleOptionChainState";
import handleTradeState from "./hooks/handleTradeState";
import "./App.css";
import "./index.css";
import TradeSandbox from "./components/TradeSandbox";

function App() {
  // const [webSocketConnected, setWebSocketConnected] =
  //   React.useState<boolean>(false);

  // const {
  //   quotesMap,
  //   quotePrices,
  //   updateQuote,
  //   updateQuotePrices,
  //   setInitialOptionsChain,
  // } = handleOptionChainState();

  const { handlePlaceTrade } = handleTradeState();

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="main-container px-4 py-4">
          <BalanceBar />
          <SymbolSelector />
          <OptionsChain />
        </div>
        <WebSocketComponent />
        <TradeSandbox />
        {/* <Toaster position="bottom-right" /> */}
      </ThemeProvider>
    </Provider>
  );
}

export default App;

{
  /* <Button
          onClick={() => {
            addNewAccountBalance({
              totalBalance: 500000,
              buyingPower: 500000,
              unsettledFunds: 0,
              buyLimit: 0,
              currentLosses: 0,
            });
          }}
        >
          Set Balance Demo
        </Button> */
}

/*

3a. Fix Expiration date button

FORGET CHAIN

map a list of options to look for based on strike, create the Ticker string and query that so the updates are real time.

4. Filter strikes by puts and calls; sort by direction

<BID> <PRICE> <ASK>                   1st click/2nd click
[.30] [.35] [.40]     [-] .36 [+]    [.36] ->  [✓] 

5. POST /buyOption
{ optionName, price, contract amount based on balance }

a. Place Option Order.
b. check account stream for updates (order > heartbeat)
- look for order status filled
c. create button and endpoint to cancel the order
d. when filled, create an OCO order:
  - Leg 1: Stop limit at -30% for ALL contracts
  - Leg 2: Limit at +50% for 4/5 contracts*

  If Leg 1 fills, update the database.
  If leg 2 fills and contracts remain, update state to update the trailing floor price = -30% of current price
  
  Create sell button set price for slightly under current

> Incremental floor %

$400 sell 8 cons (40 per) @ 50% + (8 * 60)

2 con  (50% - 1000%)

.50 =>.52 => .55 => .51 => .55 => .60 => 

.50 => [.75] => 1.00 => 2.00 => 7.00


*/
