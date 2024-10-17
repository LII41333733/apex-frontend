import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderStatuses } from "@/constants";
import { updateOrdersView } from "@/state/orderSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BadgePending } from "./badges/BadgePending";
import { BadgeCanceled } from "./badges/BadgeCanceled";
import { BadgeFilled } from "./badges/BadgeFilled";
import { BadgeOpen } from "./badges/BadgeOpen";
import { BadgeAll } from "./badges/BadgeAll";
import { BadgeRunners } from "./badges/BadgeRunners";

const OrderFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const selectStatus = (status: OrderStatuses) => {
    dispatch(updateOrdersView(status));
    const accordion: HTMLElement = document.querySelector(
      "h3 button"
    ) as HTMLElement;
    accordion?.click();
  };

  return (
    <div className="order-filter md:w-[320px] m-auto mb-5 border-0 !pt-0 !z-10">
      <div className="h-10">
        <Accordion
          type="single"
          collapsible
          className="order-accordion border-0 bg-card-background apex-card !pt-0"
        >
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger>
              <div className="accordion-title">Filter By Status</div>
              <ActiveBadge />
            </AccordionTrigger>
            <AccordionContent>
              <Tabs
                defaultValue={OrderStatuses.ALL}
                className="w-[100%] text-center"
              >
                <TabsList>
                  <TabsTrigger
                    onClick={() => selectStatus(OrderStatuses.ALL)}
                    value={OrderStatuses.ALL}
                  >
                    <BadgeAll />
                  </TabsTrigger>
                </TabsList>
                <TabsList>
                  <TabsTrigger
                    onClick={() => selectStatus(OrderStatuses.OPEN)}
                    value={OrderStatuses.OPEN}
                  >
                    <BadgeOpen />
                  </TabsTrigger>
                </TabsList>
                <TabsList>
                  <TabsTrigger
                    onClick={() => selectStatus(OrderStatuses.FILLED)}
                    value={OrderStatuses.FILLED}
                  >
                    <BadgeFilled />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Tabs
                defaultValue={OrderStatuses.PENDING}
                className="w-[100%] text-center"
              >
                <TabsList>
                  <TabsTrigger
                    onClick={() => selectStatus(OrderStatuses.PENDING)}
                    value={OrderStatuses.PENDING}
                  >
                    <BadgePending />
                  </TabsTrigger>
                </TabsList>
                <TabsList>
                  <TabsTrigger
                    onClick={() => selectStatus(OrderStatuses.CANCELED)}
                    value={OrderStatuses.CANCELED}
                  >
                    <BadgeCanceled />
                  </TabsTrigger>
                </TabsList>
                <TabsList>
                  <TabsTrigger
                    onClick={() => selectStatus(OrderStatuses.RUNNERS)}
                    value={OrderStatuses.RUNNERS}
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
  const { ordersView } = useAppSelector((state) => state.orders);

  switch (ordersView) {
    case OrderStatuses.ALL:
      return <BadgeAll />;
    case OrderStatuses.CANCELED:
      return <BadgeCanceled />;
    case OrderStatuses.PENDING:
      return <BadgePending />;
    case OrderStatuses.OPEN:
      return <BadgeOpen />;
    case OrderStatuses.FILLED:
      return <BadgeFilled />;
  }
};

export default OrderFilter;
