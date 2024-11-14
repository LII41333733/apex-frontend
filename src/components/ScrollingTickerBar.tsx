import { ValuesLibData } from '@/constants';
import { useAppSelector } from '@/state/hooks';
import { PriceData } from '@/types/PriceData';
import getValuesLibData from '@/utils/getValuesLibData';

const ScrollingTickerBar: React.FC = () => {
    const SPY = useAppSelector((state) => state.main.SPY);
    const QQQ = useAppSelector((state) => state.main.QQQ);
    const IWM = useAppSelector((state) => state.main.IWM);
    const VIX = useAppSelector((state) => state.main.VIX);
    return (
        <div className='ticker-wrapper mb-6'>
            <div className='ticker-content'>
                {/* Add your ticker items here */}
                <Ticker {...SPY} />
                <Ticker {...QQQ} />
                <Ticker {...IWM} />
                <Ticker {...VIX} />
                {/* <span>Breaking News: Stock prices are up!</span>
                <span>Latest Update: New product launch next month.</span>
                <span>Weather Alert: Heavy rain expected tomorrow.</span> */}
                {/* Repeat content if needed */}
            </div>
        </div>
    );

    // const SPY = useAppSelector((state) => state.main.SPY);
    // const QQQ = useAppSelector((state) => state.main.QQQ);
    // const IWM = useAppSelector((state) => state.main.IWM);
    // const VIX = useAppSelector((state) => state.main.VIX);

    // return (
    //     <div className='ticker-bar mt-2 justify-center leading-[1rem]'>
    //         <Ticker {...SPY} />
    //         <Ticker {...QQQ} />
    //         <Ticker {...IWM} />
    //         <Ticker {...VIX} />
    //     </div>
    // );
};

export default ScrollingTickerBar;

const Ticker: React.FC<PriceData> = ({ symbol, price, changeDollars }) => {
    const lib: ValuesLibData = getValuesLibData(changeDollars);

    return (
        <span className={`${lib.textColor}`}>
            <span className='lib.icon relative top-[0.3px] text-center w-1 inline-block'>
                {lib.icon}
            </span>
            {`${symbol} ${price || '0.00'} ${lib.operator}${
                Math.abs(Number(changeDollars)).toFixed(2) || '0.00'
            }`}
        </span>
    );
};
