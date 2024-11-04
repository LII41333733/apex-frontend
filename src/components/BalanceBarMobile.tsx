import { useAppSelector } from '@/state/hooks';
import { dollar } from '@/utils/dollar';

const BalanceBarMobile: React.FC = () => {
    const balance = useAppSelector((state) => state.balance);

    const { totalEquity, cashAvailable, marketValue, openPl, closePl } =
        balance;

    return (
        <div className='balance-bar-wrapper flex items-center w-[100%] mb-2 sm:hidden'>
            <div className='w-[170px]'>
                <img
                    className='pt-logo'
                    src='src\assets\spin-gif.gif'
                    alt='pt_logo'
                />
            </div>
            <div>
                <div className='flex flex-col text-right mr-2'>
                    <p className='text-xs apex-text-yellow'>Total Equity</p>
                    <p className='text-xs apex-text-yellow'>Cash Available</p>
                    <p className='text-xs apex-text-yellow'>Market Value</p>
                    <p className='text-xs apex-text-yellow'>Open P/L</p>
                    <p className='text-xs apex-text-yellow'>Day P/L</p>
                </div>
                <div className='flex flex-col text-left'></div>
            </div>
            <div className='flex flex-col text-left'>
                <h4 className='text-sm leading-[1rem] font-semibold text-apex-light-yellow'>
                    {dollar(totalEquity, true)}
                </h4>
                <h4 className='text-sm leading-[1rem] font-semibold text-apex-light-yellow'>
                    {dollar(cashAvailable, true)}
                </h4>
                <h4 className='text-sm leading-[1rem] font-semibold text-apex-light-yellow'>
                    {dollar(marketValue, true)}
                </h4>
                <h4 className='text-sm leading-[1rem] font-semibold text-apex-light-yellow'>
                    {dollar(openPl, true)}
                </h4>
                <h4 className='text-sm leading-[1rem] font-semibold text-apex-light-yellow'>
                    {dollar(closePl, true)}
                </h4>
            </div>
        </div>
    );
};

export default BalanceBarMobile;

{
    /* <div className="balance-bar mr-8 w-[43%] ml-auto"></div>; */
}
