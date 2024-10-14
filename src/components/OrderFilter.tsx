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
    <div className="order-filter w-full md:w-[320px] m-auto mb-5 apex-box-shadow">
      <Accordion type="single" collapsible className="w-full order-accordion">
        <AccordionItem value="item-1">
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
