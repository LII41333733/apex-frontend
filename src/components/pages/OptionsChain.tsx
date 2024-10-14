import { useAppDispatch, useAppSelector } from "@/state/hooks";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  usePlaceTradeMutation,
  useStopOptionsChainMutation,
} from "@/state/api/apex";
import convertTickerStringToLabel from "@/utils/convertTickerStringToLabel";
import React from "react";
import {
  updateConfirmedSymbol,
  updateQuotesPrices,
} from "@/state/optionsChainSlice";
import Quote from "@/interfaces/Quote";
import SymbolSelectorWithLotto from "../SymbolSelectorWithLotto";
import float from "@/utils/float";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RiskType } from "@/constants";
import { primary } from "@/utils/colors";

const OptionsChain: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    quotesMap,
    quotesPrices,
    activeSymbol,
    confirmedSymbol,
    expirationDate,
    riskType,
  } = useAppSelector((state) => state.optionsChain);
  const [placeTrade, { isLoading }] = usePlaceTradeMutation();
  const [stopOptionsChain] = useStopOptionsChainMutation();
  const quotes: [string, Quote][] = Object.entries(quotesMap);

  const updateQuotePrice = (symbol: string, isIncrease: boolean) => {
    if (symbol) {
      const updateDifference = 0.01;
      const price: number = parseFloat(quotesPrices[symbol]);
      const newPrice: number = isIncrease
        ? price + updateDifference
        : price - updateDifference < 0
        ? 0
        : price - updateDifference;

      dispatch(updateQuotesPrices({ symbol, price: float(newPrice) }));
    }
  };

  return (
    <div className="dashboard flex w-full flex-col">
      <SymbolSelectorWithLotto />
      <Table
        id="options-chain-table"
        className={`${
          activeSymbol ? "" : "hide-oc"
        } text-xs options-chain-table border-0 w-full min-w-[320px] max-w-[320px] md:max-w-[400px] card apex-card mx-auto`}
      >
        <TableHeader className="text-xs">
          <TableRow className="border-none">
            <TableCell>
              {activeSymbol} {expirationDate}
            </TableCell>
            <TableCell>Bid</TableCell>
            <TableCell>Ask</TableCell>
            <TableCell>Price</TableCell>
            <TableCell onClick={async () => await stopOptionsChain({})}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-circle-x close-chain"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={primary()}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M10 10l4 4m0 -4l-4 4" />
              </svg>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...quotes].map(([key, data]) => {
            const symbol = data?.symbol ?? "";
            const showConfirm = confirmedSymbol === symbol;
            const currentPrice = quotesPrices[symbol];
            const ask = data?.ask ?? 0;
            const askIsLottoPrice = ask < 0.15 && riskType === RiskType.BASE;

            if (symbol) {
              return (
                <TableRow key={key}>
                  <TableCell className="font-semibold">
                    {convertTickerStringToLabel(symbol)}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      dispatch(
                        updateQuotesPrices({
                          symbol,
                          price: float(data?.bid),
                        })
                      )
                    }
                    className="cursor-pointer"
                  >
                    {(data?.bid ?? 0).toFixed(2)}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      dispatch(
                        updateQuotesPrices({
                          symbol,
                          price: float(data?.ask),
                        })
                      )
                    }
                    className="cursor-pointer"
                  >
                    {ask.toFixed(2)}
                  </TableCell>
                  {!showConfirm && (
                    <>
                      <TableCell>
                        <div className="edit-price">
                          <svg
                            onClick={() => {
                              updateQuotePrice(symbol, false);
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-circle-minus inline"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke={primary()}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M9 12l6 0" />
                          </svg>
                          <span>{quotesPrices[symbol]}</span>
                          <svg
                            onClick={() => {
                              updateQuotePrice(symbol, true);
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-circle-plus inline"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke={primary()}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                            <path d="M9 12h6" />
                            <path d="M12 9v6" />
                          </svg>
                        </div>
                      </TableCell>
                      <TableCell>
                        {askIsLottoPrice ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-info-circle-filled"
                                  width="18"
                                  height="18"
                                  viewBox="2 -1 24 22"
                                  strokeWidth="1.5"
                                  stroke={primary()}
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <path
                                    d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"
                                    strokeWidth="0"
                                    fill={primary()}
                                  />
                                </svg>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Contracts under 0.15 must be placed as Lotto
                                  trades.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <svg
                            onClick={() =>
                              dispatch(updateConfirmedSymbol(symbol))
                            }
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-check"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke={primary()}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        )}
                      </TableCell>
                    </>
                  )}
                  {showConfirm && (
                    <>
                      <TableCell className="selected-symbol">
                        <svg
                          onClick={() => dispatch(updateConfirmedSymbol(""))}
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-x"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                          stroke={primary()}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M18 6l-12 12" />
                          <path d="M6 6l12 12" />
                        </svg>
                        {currentPrice}
                      </TableCell>
                      <TableCell className="apex-text-yellow cursor-pointer">
                        <svg
                          onClick={async () => {
                            await placeTrade({
                              option: symbol,
                              price: parseFloat(currentPrice),
                              riskType: riskType.toString().toUpperCase(),
                            });
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-checks"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                          stroke={primary()}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M7 12l5 5l10 -10" />
                          <path d="M2 12l5 5m5 -5l5 -5" />
                        </svg>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            } else return <></>;
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default OptionsChain;
