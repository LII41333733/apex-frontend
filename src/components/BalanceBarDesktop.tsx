import { useAppSelector } from '@/state/hooks';
import { dollar } from '@/utils/dollar';
import DisplaySelector from './DisplaySelector';

const BalanceBarDesktop: React.FC = () => {
    const balance = useAppSelector((state) => state.balance);

    const { totalEquity, cashAvailable, marketValue, openPl, closePl } =
        balance;

    return (
        <div className='balance-bar-wrapper flex items-center w-[100%]'>
            <img
                className='pt-logo h-[60px]'
                src='src\assets\spin-gif.gif'
                alt='pt_logo'
            />
            <DisplaySelector />
            <div className='balance-bar justify-end ml-auto flex flex-row pr-12'>
                <div className='group mr-6 flex flex-col'>
                    <p className='tracking-wide text-[0.8rem] mb-0.25 leading-[1rem] text-right'>
                        Total Equity
                    </p>
                    <h4 className='text-base leading-[1rem] text-right font-semibold text-apex-light-yellow'>
                        {dollar(totalEquity, true)}
                    </h4>
                </div>
                <div className='group mr-6 flex flex-col'>
                    <p className='tracking-wide text-[0.8rem] mb-0.25 leading-[1rem] text-right'>
                        Cash Available
                    </p>
                    <h4 className='text-base leading-[1rem] text-right font-semibold text-apex-light-yellow'>
                        {dollar(cashAvailable, true)}
                    </h4>
                </div>
                <div className='group mr-6 flex flex-col'>
                    <p className='tracking-wide text-[0.8rem] mb-0.25 leading-[1rem] text-right'>
                        Market Value
                    </p>
                    <h4 className='text-base leading-[1rem] text-right font-semibold text-apex-light-yellow'>
                        {dollar(marketValue, true)}
                    </h4>
                </div>
                <div className='group mr-6 flex flex-col'>
                    <p className='tracking-wide text-[0.8rem] mb-0.25 leading-[1rem] text-right'>
                        Day P/L
                    </p>
                    <h4 className='text-base leading-[1rem] text-right font-semibold text-apex-light-yellow'>
                        {dollar(closePl, true)}
                    </h4>
                </div>
                <div className='group mr-6 flex flex-col'>
                    <p className='tracking-wide text-[0.8rem] mb-0.25 leading-[1rem] text-right'>
                        Open P/L
                    </p>
                    <h4 className='text-base leading-[1rem] text-right font-semibold text-apex-light-yellow'>
                        {dollar(openPl, true)}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default BalanceBarDesktop;
