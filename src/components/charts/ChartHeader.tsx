import React from 'react';
import { CardDescription, CardHeader, CardTitle } from '../ui/card';
import { TrendingDown, TrendingUp } from 'lucide-react';

const ChartHeader: React.FC<{
    mainTitle: string;
    mainSubtitle: string;
    secondaryTitle: string;
    secondarySubtitle: string;
    trendIsUp?: boolean;
}> = ({
    mainTitle,
    mainSubtitle,
    secondaryTitle,
    secondarySubtitle,
    trendIsUp,
}) => {
    return (
        <div className="grid grid-cols-4 px-6">
            <CardHeader className="col-span-3 px-0">
                <CardTitle>{mainTitle}</CardTitle>
                <CardDescription>{mainSubtitle}</CardDescription>
            </CardHeader>
            <CardHeader className="col-span-1 px-0 italic">
                <div className="flex items-center gap-2 font-medium leading-none justify-end text-sm">
                    {secondaryTitle}
                    {trendIsUp === undefined ? (
                        <></>
                    ) : trendIsUp ? (
                        <TrendingUp className="h-4 w-4" />
                    ) : (
                        <TrendingDown className="h-4 w-4" />
                    )}
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground justify-end text-sm">
                    {secondarySubtitle}
                </div>
            </CardHeader>
        </div>
    );
};

export default ChartHeader;
