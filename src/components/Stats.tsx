import React, { ReactNode } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DollarSign,
    Calendar1,
    CalendarRange,
    CalendarDays,
    CalendarMinus2,
} from 'lucide-react';
import { useAppSelector } from '@/state/hooks';
import { dollar } from '@/utils/dollar';
import { formatToEst } from '@/utils/formatToEST';
import SquareLetterA from '@/assets/svg/SquareLetterA';
import SquareLetterH from '@/assets/svg/SquareLetterH';

const Stats: React.FC = () => {
    const balance = useAppSelector((state) => state.balance);
    const lastFilledBeforeToday = useAppSelector(
        (state) => state.trades.lastFilledBeforeToday
    );
    const { totalEquity, openPl, closePl } = balance;

    const [currentTime, setCurrentTime] = React.useState<Date | null>(null);

    React.useEffect(() => {
        setCurrentTime(new Date());
    }, [balance]);

    return (
        <div className="grid grid-cols-5 gap-4">
            <StatBox
                label="Total Equity"
                value={dollar(totalEquity, false)}
                icon={<DollarSign className="h-5 w-5" />}
                currentTime={currentTime}
            />
            <StatBox
                label="Today's P/L"
                value="+$12,234"
                icon={<Calendar1 className="h-5 w-5" />}
                high="$12,234"
                average="$24,000"
            />
            <StatBox
                label="Weekly P/L"
                value="+$12,234"
                icon={<CalendarMinus2 className="h-5 w-5" />}
                high="$12,000"
                average="$24,000"
            />
            <StatBox
                label="Monthly P/L"
                value="+$12,234"
                icon={<CalendarRange className="h-5 w-5" />}
                high="$12,000"
                average="$24,000"
            />
            <StatBox
                label="Yearly P/L"
                value="+$12,234"
                icon={<CalendarDays className="h-5 w-5" />}
                high="$12,000"
                average="$24,000"
            />
        </div>
    );
};

const StatBox = ({
    label,
    value,
    icon,
    currentTime,
    high,
    average,
}: {
    label: string;
    value: number | string;
    icon: ReactNode;
    currentTime?: Date | null;
    high?: number | string;
    average?: number | string;
}) => {
    return (
        <div className="apex-card w-[100%]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 pt-1 pl-4 pr-3">
                <CardTitle className="text-md font-medium">{label}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent className="p-0 pl-4 pr-3 pb-4">
                <div className="stats-main text-[1.4rem] font-bold text-apex-light-yellow mb-1">
                    {value}
                </div>
                {currentTime ? (
                    <p className="text-xs mt-1.5">{`as of ${
                        currentTime ? formatToEst(currentTime) : '-'
                    }`}</p>
                ) : (
                    <>
                        <SquareLetterH className="float-left" />
                        <span className="ml-1 float-left relative w-15 top-[0.18rem] text-xs">
                            {high}
                        </span>
                        <span className="ml-1 float-right relative w-15 top-[0.18rem] text-xs">
                            {average}
                        </span>
                        <SquareLetterA className="float-right" />
                    </>
                )}
            </CardContent>
        </div>
    );
};

export default Stats;
