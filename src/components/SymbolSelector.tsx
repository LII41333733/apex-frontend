import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import symbols from "../constants/symbols";
import getOptionsChain from "../service/getOptionsChain";
import CallPutSwitch from "../components/CallPutSwitch";
import { AppStateKey } from "@/constants";
import startOptionChainStream from "@/service/startOptionChainStream";
import Quote from "@/interfaces/Quote";
import placeSandboxTrade from "@/service/placeSandboxTrade";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useGetOptionsChainMutation } from "@/state/api/apex";
import { updateSymbolInput } from "@/state/optionsChainSlice";

// interface SymbolSelectorProps {
//   updateAppStateValue: (key: string, value: unknown) => void;
//   setInitialOptionsChain: (data: Quote[]) => void;
// }

const SymbolSelector: React.FC = () => {
  const {
    quotesMap,
    quotesPrices,
    optionType,
    symbolInput,
    activeSymbol,
    confirmedSymbol,
  } = useAppSelector((state) => state.optionsChain);

  const dispatch = useAppDispatch();

  const [getOptionsChain] = useGetOptionsChainMutation();

  return (
    <Card className="w-[100%] card pt-1 my-3">
      <CardContent className="px-2 py-1">
        <section className="flex items-center mb-1">
          <CallPutSwitch />
          <Input
            className="w-[40%] mr-2"
            placeholder="Symbol"
            value={symbolInput}
            onChange={(e) => dispatch(updateSymbolInput(e.target.value))}
          />
          <Button
            className="search-btn"
            onClick={async () => {
              // updateAppStateValue(AppStateKey.activeSymbol, symbolInput);
              // placeSandboxTrade(symbolInput, optionType);
              // N:B: Uncomment for Production. Search for Sandbox only.
              // const res = await getOptionsChain(symbolInput, optionType);
              // handleSetInitialOptionsChain(res);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-search"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="hsl(var(--primary))"
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
                await getOptionsChain({ symbol: e, optionType });
              }}
              className="rounded badge symbol-badge"
              variant="outline"
            >
              {e}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SymbolSelector;
