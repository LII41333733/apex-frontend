import React from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react';

const Stats: React.FC = () => {
    return (
        <div className='grid grid-cols-5 gap-4'>
            <div className='apex-card card w-[100%]'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-0 pt-2'>
                    <CardTitle className='text-md font-medium'>
                        Total Equity
                    </CardTitle>
                    <DollarSign className='h-4 w-4' />
                </CardHeader>
                <CardContent className='pb-4'>
                    <div className='stats-main text-xl font-bold text-apex-light-yellow'>
                        $45,231.89
                    </div>
                    <p className='text-xs'>+20.1% from last year</p>
                </CardContent>
            </div>
            <div className='apex-card card w-[100%]'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-0 pt-2'>
                    <CardTitle className='text-md font-medium'>
                        Today's P/L
                    </CardTitle>
                    <Users className='h-4 w-4' />
                </CardHeader>
                <CardContent className='pb-4'>
                    <div className='stats-main text-xl font-bold text-apex-light-yellow'>
                        +$2350
                    </div>
                    <p className='text-xs'>+180.1% from last month</p>
                </CardContent>
            </div>
            <div className='apex-card card w-[100%]'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-0 pt-2'>
                    <CardTitle className='text-md font-medium'>
                        Weekly P/L
                    </CardTitle>
                    <CreditCard className='h-4 w-4' />
                </CardHeader>
                <CardContent className='pb-4'>
                    <div className='stats-main text-xl font-bold text-apex-light-yellow'>
                        +$12,234
                    </div>
                    <p className='text-xs'>+19% from last week</p>
                </CardContent>
            </div>
            <div className='apex-card card w-[100%]'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-0 pt-2'>
                    <CardTitle className='text-md font-medium'>
                        Monthly's P/L
                    </CardTitle>
                    <Activity className='h-4 w-4' />
                </CardHeader>
                <CardContent className='pb-4'>
                    <div className='stats-main text-xl font-bold text-apex-light-yellow'>
                        +$573
                    </div>
                    <p className='text-xs'>+20% from yesterday</p>
                </CardContent>
            </div>
            <div className='apex-card card w-[100%]'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-0 pt-2'>
                    <CardTitle className='text-md font-medium'>
                        Yearly P/L
                    </CardTitle>
                    <Activity className='h-4 w-4' />
                </CardHeader>
                <CardContent className='pb-4'>
                    <div className='stats-main text-xl font-bold text-apex-light-yellow'>
                        +$573
                    </div>
                    <p className='text-xs'>+20% from yesterday</p>
                </CardContent>
            </div>
        </div>
    );
};

export default Stats;
