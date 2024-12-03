import { ValuesLibData } from '@/constants';
import { useAppSelector } from '@/state/hooks';
import { PriceData } from '@/types/PriceData';
import getValuesLibData from '@/utils/getValuesLibData';
import React from 'react';

const ScrollingTickerBar: React.FC = () => {
    const symbols = useAppSelector((state) => state.main.symbols);
    const symbolHolder = [...symbols, ...symbols, ...symbols, ...symbols];
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
                {scrolledSymbols.map((e: any, i: number) => (
                    <Ticker key={e + i} {...e} />
                ))}
            </div>
        </div>
    );
};

export default ScrollingTickerBar;

const Ticker: React.FC<PriceData> = ({ symbol, price, changeDollars }) => {
    const lib: ValuesLibData = getValuesLibData(changeDollars);

    const displayPrice = isNaN(Number(price)) ? '0.00' : price;
    const displayChange = isNaN(Number(changeDollars)) ? '0.00' : changeDollars;

    return (
        <span className={`${lib.textColor} mr-5 relative`}>
            <span className="lib.icon relative top-[-1px] text-center !px-0 inline-block mr-1">
                {lib.icon}
            </span>
            {`${symbol} ${displayPrice} ${lib.operator}${Math.abs(
                Number(displayChange)
            ).toFixed(2)}`}
        </span>
    );
};
