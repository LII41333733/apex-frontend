import { ValuesLibData } from '@/constants';
import { useAppSelector } from '@/state/hooks';
import { PriceData } from '@/types/PriceData';
import getValuesLibData from '@/utils/getValuesLibData';
import React from 'react';

const ScrollingTickerBar: React.FC = () => {
    const symbols = useAppSelector((state) => state.main.symbols);
    const symbolHolder = [...symbols, ...symbols, ...symbols, ...symbols];
    console.log(symbolHolder);
    const [scrolledSymbols, setScrolledSymbols] = React.useState<PriceData[]>(
        []
    );

    const scrollRef = React.useRef(null);

    React.useEffect(() => {
        if (scrollRef.current) {
            // console.log(scrollRef.current);
        }
    }, [scrollRef]);

    React.useEffect(() => setScrolledSymbols(symbolHolder), [symbols]);

    return (
        <div className="ticker-wrapper mb-6">
            <div ref={scrollRef} className="ticker-content">
                {scrolledSymbols.map((e: any) => (
                    <Ticker {...e} />
                ))}
            </div>
        </div>
    );
};

export default ScrollingTickerBar;

const Ticker: React.FC<PriceData> = ({ symbol, price, changeDollars }) => {
    const lib: ValuesLibData = getValuesLibData(changeDollars);

    return (
        <span className={`${lib.textColor} mr-5 relative`}>
            <span className="lib.icon relative top-[-1px] text-center !px-0 inline-block mr-1">
                {lib.icon}
            </span>
            {`${symbol} ${price || '0.00'} ${lib.operator}${
                Math.abs(Number(changeDollars)).toFixed(2) || '0.00'
            }`}
        </span>
    );
};
