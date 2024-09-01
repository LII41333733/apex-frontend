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
import { Order } from "@/interfaces/Order";
import OpenPosition from "./OpenPosition";

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();

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

  const getOrderList = () => {
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

  const orderList = getOrderList();

  return (
    <div id="orders">
      <RenderPositions />
      <p className="text-sm font-normal mb-4">{`Orders (${orderList.length})`}</p>
      <OrderFilter />
      <RenderOrders orderList={orderList} />
    </div>
  );
};

const RenderPositions: React.FC = () => {
  return (
    <div className="positions mb-8">
      <p className="text-sm font-normal mb-3">{`Open Positions (0)`}</p>
      <OpenPosition />
    </div>
  );
};

const RenderOrders: React.FC<{ orderList: Order[] }> = ({ orderList }) => {
  return (
    <>
      {orderList.map(({ leg, status }) => {
        const symbol: string = leg[0].optionSymbol;

        return (
          <Accordion
            type="single"
            collapsible
            className="w-full order-accordion"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="accordion-title">
                  {convertTickerWithExpiration(symbol)}
                </div>
                <StatusBadge status={status as OrderDataStatuses} />
              </AccordionTrigger>
              <AccordionContent>
                <div className="accordion-content">
                  <div className="accordion-row">
                    <div className="cell font-normal accordion-label">
                      Trigger
                    </div>
                    <div className="cell accordion-price">2.00</div>
                    <div className="cell accordion-status">
                      <StatusBadge
                        status={leg[0].status as OrderDataStatuses}
                      />
                    </div>
                  </div>
                  <div className="accordion-row">
                    <div className="cell font-normal accordion-label">
                      Limit
                    </div>
                    <div className="cell accordion-price">4.00</div>
                    <div className="cell accordion-status">
                      <StatusBadge
                        status={leg[1].status as OrderDataStatuses}
                      />
                    </div>
                  </div>
                  <div className="accordion-row">
                    <div className="cell font-normal accordion-label">Stop</div>
                    <div className="cell accordion-price">1.00</div>
                    <div className="cell accordion-status">
                      <StatusBadge
                        status={leg[2].status as OrderDataStatuses}
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </>
  );
};

export const StatusBadge: React.FC<{ status: OrderDataStatuses }> = ({
  status,
}) => {
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
