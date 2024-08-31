import { useAppDispatch, useAppSelector } from "@/state/hooks";
import OrderFilter from "./OrderFilter";
import { OrderDataStatuses, OrderStatuses } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import convertTickerWithExpiration from "@/utils/convertTickerWithExpiration";
import { BadgeAll } from "./badges/BadgeAll";
import { BadgeCanceled } from "./badges/BadgeCanceled";
import { BadgePending } from "./badges/BadgePending";
import { BadgeOpen } from "./badges/BadgeOpen";
import { BadgeFilled } from "./badges/BadgeFilled";

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div id="orders">
      <OrderFilter />
      <RenderOrders />
    </div>
  );
};

const RenderOrders: React.FC = () => {
  const {
    orderSummary: {
      allOrders,
      openOrders,
      otherOrders,
      pendingOrders,
      filledOrders,
    },
    ordersView,
  } = useAppSelector((state) => state.orders);

  const { orderSummary } = useAppSelector((state) => state.orders);

  console.log(orderSummary);

  const getOrderList = () => {
    console.log(ordersView);

    switch (ordersView) {
      case OrderStatuses.ALL:
        return allOrders;
      case OrderStatuses.CANCELED:
        return otherOrders;
      case OrderStatuses.PENDING:
        return pendingOrders;
      case OrderStatuses.OPEN:
        return openOrders;
      case OrderStatuses.FILLED:
        return filledOrders;
    }
  };

  return getOrderList().map(({ leg, status }) => {
    const symbol: string = leg[0].optionSymbol;

    return (
      <Accordion type="single" collapsible className="w-full order-accordion">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="accordion-title">
              {convertTickerWithExpiration(symbol)}
            </div>
            <StatusBadge status={status as OrderDataStatuses} />
          </AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });
};

const StatusBadge: React.FC<{ status: OrderDataStatuses }> = ({ status }) => {
  switch (status) {
    case OrderDataStatuses.CANCELED:
      return <BadgeCanceled />;
    case OrderDataStatuses.PENDING:
      return <BadgePending />;
    case OrderDataStatuses.OPEN:
      return <BadgeOpen />;
    case OrderDataStatuses.FILLED:
      return <BadgeFilled />;
  }
};

export default Orders;
