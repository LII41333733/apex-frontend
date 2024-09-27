import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CallPutSwitch from "./CallPutSwitch";
import { MINI_SYMBOLS, SYMBOLS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useGetOptionsChainMutation } from "@/state/api/apex";
import LottoSwitch from "./LottoSwitch";
import { Input } from "./ui/input";
import { updateSymbolInput } from "@/state/optionsChainSlice";
import { Button } from "./ui/button";

const SymbolSelectorWithLotto: React.FC = () => {
  const dispatch = useAppDispatch();
  const { optionType, symbolInput } = useAppSelector(
    (state) => state.optionsChain
  );
  const [getOptionsChain] = useGetOptionsChainMutation();

  return (
    <Card className="w-[100%] card pt-1 mt-5 mb-3">
      <CardContent className="px-2 py-1">
        <section className="mb-1 settings">
          <CallPutSwitch />
          <LottoSwitch />
          <Input
            className="w-[33%] h-8 text-center symbol-input"
            placeholder="NKE"
            value={symbolInput}
            onChange={(e) =>
              dispatch(updateSymbolInput(e.target.value.toUpperCase()))
            }
          />
          <Button
            className="search-btn"
            onClick={async () => {
              await getOptionsChain({ symbol: symbolInput, optionType });
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
        <section className="main-symbols">
          <Badge
            onClick={async () => {
              await getOptionsChain({ symbol: SYMBOLS.SPY, optionType });
            }}
            className="rounded badge symbol-badge"
            variant="outline"
          >
            {SYMBOLS.SPY}
          </Badge>
          <Badge
            onClick={async () => {
              await getOptionsChain({ symbol: SYMBOLS.QQQ, optionType });
            }}
            className="rounded badge symbol-badge"
            variant="outline"
          >
            {SYMBOLS.QQQ}
          </Badge>
          <Badge
            onClick={async () => {
              await getOptionsChain({ symbol: SYMBOLS.IWM, optionType });
            }}
            className="rounded badge symbol-badge"
            variant="outline"
          >
            {SYMBOLS.IWM}
          </Badge>
        </section>
        <section className="mini-badges">
          {Object.values(MINI_SYMBOLS).map((e: SYMBOLS) => (
            <Badge
              key={e}
              onClick={async () => {
                await getOptionsChain({ symbol: e, optionType });
              }}
              className="rounded badge symbol-badge mini"
              variant="outline"
            >
              {e}
            </Badge>
          ))}
        </section>
      </CardContent>
    </Card>
  );
};

export default SymbolSelectorWithLotto;
