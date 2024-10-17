import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
    <Card className="border-0 m-auto w-[320px] md:w-[80%] md:min-w-[320px] max-w-[500px] option-box">
      <section className="mb-3">
        <CallPutSwitch />
        <LottoSwitch />
        <Input
          className="w-[25%] h-8 text-center symbol-input transparent-ring text-foreground bg-background order-apex-yellow"
          placeholder="INTC"
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
            width="16"
            height="16"
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
      <section className="main-symbols mb-3">
        <Badge
          onClick={async () => {
            await getOptionsChain({ symbol: SYMBOLS.SPY, optionType });
          }}
          className="rounded badge bg-background symbol-badge md:text-sm"
          variant="outline"
        >
          {SYMBOLS.SPY}
        </Badge>
        <Badge
          onClick={async () => {
            await getOptionsChain({ symbol: SYMBOLS.QQQ, optionType });
          }}
          className="rounded badge bg-background symbol-badge md:text-sm"
          variant="outline"
        >
          {SYMBOLS.QQQ}
        </Badge>
        <Badge
          onClick={async () => {
            await getOptionsChain({ symbol: SYMBOLS.IWM, optionType });
          }}
          className="rounded badge bg-background symbol-badge md:text-sm"
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
            className="rounded badge bg-background symbol-badge md:text-sm mini mb-3"
            variant="outline"
          >
            {e}
          </Badge>
        ))}
      </section>
    </Card>
  );
};

export default SymbolSelectorWithLotto;
