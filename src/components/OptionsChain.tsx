import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { OptionsChainProps } from "@/interfaces/OptionsChainProps";
import convertTickerStringToLabel from "@/utils/convertTickerStringToLabel";
import React from "react";

const OptionsChain: React.FC<OptionsChainProps> = ({
  activeSymbol,
  quotesMap,
  quotePrices,
  updateQuotePrices,
  selectedSymbol,
  setSelectedSymbol,
  handlePlaceTrade,
}) => {
  // console.log(quotesMap);
  // console.log(quotePrices);

  const updateQuotePrice = (symbol: string, isIncrease: boolean) => {
    const updateDifference = 0.01;

    if (symbol) {
      const price: number | null | undefined = quotePrices.get(symbol) ?? 0;
      const newPrice: number = isIncrease
        ? price + updateDifference
        : price - updateDifference < 0
        ? 0
        : price - updateDifference;

      updateQuotePrices(symbol, newPrice, false);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>{activeSymbol}</TableCell>
          <TableCell>Bid</TableCell>
          <TableCell>Ask</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...quotesMap.entries()].map(([key, data]) => {
          const symbol = data?.symbol ?? "";
          const isSelected = selectedSymbol === symbol;
          const currentPrice = quotePrices.get(symbol) ?? 0;

          return (
            <TableRow key={key}>
              <TableCell>{convertTickerStringToLabel(symbol)}</TableCell>
              <TableCell className="cursor-pointer">
                {(data?.bid ?? 0).toFixed(2)}
              </TableCell>
              <TableCell className="cursor-pointer">
                {(data?.ask ?? 0).toFixed(2)}
              </TableCell>
              {!isSelected && (
                <>
                  <TableCell>
                    <div className="edit-price">
                      <svg
                        onClick={() => {
                          updateQuotePrice(symbol, false);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-circle-minus inline"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#facc15"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M9 12l6 0" />
                      </svg>
                      <span>{quotePrices.get(symbol)?.toFixed(2) ?? ""}</span>
                      <svg
                        onClick={() => {
                          updateQuotePrice(symbol, true);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-circle-plus inline"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#facc15"
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
                    <svg
                      onClick={() => setSelectedSymbol(symbol)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-check"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2.5"
                      stroke="#facc15"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 12l5 5l10 -10" />
                    </svg>
                  </TableCell>
                </>
              )}
              {isSelected && (
                <>
                  <TableCell className="selected-symbol">
                    <svg
                      onClick={() => setSelectedSymbol("")}
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-x"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2.5"
                      stroke="#facc15"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M18 6l-12 12" />
                      <path d="M6 6l12 12" />
                    </svg>
                    {currentPrice}
                    <svg
                      onClick={() => {}}
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-checks"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2.5"
                      stroke="#facc15"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 12l5 5l10 -10" />
                      <path d="M2 12l5 5m5 -5l5 -5" />
                    </svg>
                  </TableCell>
                  <TableCell
                    className="text-primary cursor-pointer"
                    onClick={() => {
                      handlePlaceTrade(symbol, currentPrice);
                    }}
                  >
                    OK?
                  </TableCell>
                </>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default OptionsChain;
