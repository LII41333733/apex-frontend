import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CallPutSwitch from "./CallPutSwitch";
import { SYMBOLS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useGetOptionsChainMutation } from "@/state/api/apex";
import LottoSwitch from "./LottoSwitch";

const SymbolSelectorWithLotto: React.FC = () => {
  const { optionType } = useAppSelector((state) => state.optionsChain);
  const [getOptionsChain] = useGetOptionsChainMutation();

  return (
    <Card className="w-[100%] card pt-1 mt-5 mb-3">
      <CardContent className="px-2 py-1">
        <section className="mb-1">
          <CallPutSwitch />
          <LottoSwitch />
        </section>
        <div className="spaced">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default SymbolSelectorWithLotto;
