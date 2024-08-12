import React from "react";
import "./App.css";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import symbols from "./constants/symbols";
import WebSocketComponent from "./components/WebSocketComponent";
import getBalance from "./service/getBalance";
import getOptionChainTemplate from "./service/getOptionChainTemplate";
import CallPutSwitch from "./components/CallPutSwitch";
import isOK from "./utils/statusUtils/isOK";
import { BalanceBar } from "./components/BalanceBar";
import OptionsChain from "./components/OptionsChain";
import handleOptionChainState from "./hooks/handleOptionChainState";
import handleTradeState from "./hooks/handleTradeState";

function App() {
  // const env = "DEV";
  // const isDev = env === "DEV";

  const [cashAvailable, setCashAvailable] = React.useState<number>(0);
  const [unsettledFunds, setUnsettledFunds] = React.useState<number>(0);
  const [optionType, setOptionType] = React.useState<string>("Call");
  const [symbolInput, setSymbolInput] = React.useState<string>("");
  const [activeSymbol, setActiveSymbol] = React.useState<string>("");

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchBalance = async () => {
      const res = await getBalance();
      const { unsettled_funds, cash_available } = res.data;
      const uf = parseFloat(unsettled_funds);
      const ca = parseFloat(cash_available);
      setUnsettledFunds(uf);
      setCashAvailable(ca);
    };

    fetchBalance();
  }, []);

  const {
    setTemplate,
    quotesMap,
    quotePrices,
    updateQuote,
    updateQuotePrices,
    selectedSymbol,
    setSelectedSymbol,
  } = handleOptionChainState();

  const { handlePlaceTrade } = handleTradeState();

  // console.log(quotePrices);
  // console.log(quotesMap);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="main-container px-4 py-4">
        <BalanceBar
          isOpen={isOpen}
          cashAvailable={cashAvailable}
          unsettledFunds={unsettledFunds}
        />
        <Card className="w-[100%] card pt-1 my-3">
          <CardContent className="px-2 py-1">
            <section className="flex items-center mb-1">
              <CallPutSwitch setOptionType={setOptionType} />
              <Input
                className="w-[40%] mr-2"
                placeholder="Symbol"
                value={symbolInput}
                onChange={(e) => setSymbolInput(e.target.value)}
              />
              <Button
                onClick={async () => {
                  const res = await getOptionChainTemplate(
                    symbolInput,
                    optionType
                  );

                  if (isOK(res)) {
                    setTemplate(res.data);
                    setActiveSymbol(symbolInput);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-search"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                  <path d="M21 21l-6 -6" />
                </svg>
              </Button>
            </section>
            <div className="spaced">
              {symbols.map((e) => (
                <Badge
                  key={e}
                  onClick={async () => {
                    const res = await getOptionChainTemplate(e, optionType);
                    if (isOK(res)) {
                      setTemplate(res.data);
                      setActiveSymbol(e);
                    }
                  }}
                  className="rounded-xl badge"
                  variant="outline"
                >
                  {e}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <OptionsChain
          activeSymbol={activeSymbol}
          quotesMap={quotesMap}
          quotePrices={quotePrices}
          updateQuotePrices={updateQuotePrices}
          selectedSymbol={selectedSymbol}
          setSelectedSymbol={setSelectedSymbol}
          handlePlaceTrade={handlePlaceTrade}
        />
      </div>
      <WebSocketComponent
        setIsOpen={setIsOpen}
        updateQuote={updateQuote}
        updateQuotePrices={updateQuotePrices}
      />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;

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
