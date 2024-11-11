import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TradeStatus } from '@/constants';
import { updateOrdersView } from '@/state/orderSlice';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { BadgePending } from './badges/BadgePending';
import { BadgeCanceled } from './badges/BadgeCanceled';
import { BadgeFilled } from './badges/BadgeFilled';
import { BadgeOpen } from './badges/BadgeOpen';
import { BadgeAll } from './badges/BadgeAll';
import { BadgeRunners } from './badges/BadgeRunners';

const OrderFilter: React.FC = () => {
    const dispatch = useAppDispatch();

    const selectStatus = (status: TradeStatus) => {
        dispatch(updateOrdersView(status));
        const accordion: HTMLElement = document.querySelector(
            'h3 button'
        ) as HTMLElement;
        accordion?.click();
    };

    return (
        <div className='order-filter md:w-[320px] m-auto mb-10 border-0 !pt-0 !z-10 '>
            <div className='h-10'>
                <Accordion
                    type='single'
                    collapsible
                    className='order-accordion border-0 !bg-muted apex-card !pt-0'
                >
                    <AccordionItem value='item-1' className='border-0'>
                        <AccordionTrigger className='hover:no-underline'>
                            <div className='accordion-title'>
                                Filter By Status
                            </div>
                            <ActiveBadge />
                        </AccordionTrigger>
                        <AccordionContent>
                            <Tabs
                                defaultValue={TradeStatus.ALL}
                                className='w-[100%] text-center'
                            >
                                <TabsList>
                                    <TabsTrigger
                                        onClick={() =>
                                            selectStatus(TradeStatus.ALL)
                                        }
                                        value={TradeStatus.ALL}
                                    >
                                        <BadgeAll />
                                    </TabsTrigger>
                                </TabsList>
                                <TabsList>
                                    <TabsTrigger
                                        onClick={() =>
                                            selectStatus(TradeStatus.OPEN)
                                        }
                                        value={TradeStatus.OPEN}
                                    >
                                        <BadgeOpen />
                                    </TabsTrigger>
                                </TabsList>
                                <TabsList>
                                    <TabsTrigger
                                        onClick={() =>
                                            selectStatus(TradeStatus.FILLED)
                                        }
                                        value={TradeStatus.FILLED}
                                    >
                                        <BadgeFilled />
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                            <Tabs
                                defaultValue={TradeStatus.PENDING}
                                className='w-[100%] text-center'
                            >
                                <TabsList>
                                    <TabsTrigger
                                        onClick={() =>
                                            selectStatus(TradeStatus.PENDING)
                                        }
                                        value={TradeStatus.PENDING}
                                    >
                                        <BadgePending />
                                    </TabsTrigger>
                                </TabsList>
                                <TabsList>
                                    <TabsTrigger
                                        onClick={() =>
                                            selectStatus(TradeStatus.CANCELED)
                                        }
                                        value={TradeStatus.CANCELED}
                                    >
                                        <BadgeCanceled />
                                    </TabsTrigger>
                                </TabsList>
                                <TabsList>
                                    <TabsTrigger
                                        onClick={() =>
                                            selectStatus(TradeStatus.RUNNERS)
                                        }
                                        value={TradeStatus.RUNNERS}
                                    >
                                        <BadgeRunners />
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

const ActiveBadge = () => {
    const ordersView = useAppSelector((state) => state.orders.ordersView);

    switch (ordersView) {
        case TradeStatus.ALL:
            return <BadgeAll />;
        case TradeStatus.CANCELED:
            return <BadgeCanceled />;
        case TradeStatus.PENDING:
            return <BadgePending />;
        case TradeStatus.OPEN:
            return <BadgeOpen />;
        case TradeStatus.FILLED:
            return <BadgeFilled />;
        case TradeStatus.RUNNERS:
            return <BadgeRunners />;
    }
};

export default OrderFilter;
