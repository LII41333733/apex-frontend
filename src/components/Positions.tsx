import { useAppDispatch, useAppSelector } from "@/state/hooks";
import OrderFilter from "./OrderFilter";
import { TradeStatus, OrderStatuses } from "@/constants";
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
import OpenPosition from "./OpenPositions";
import { Button } from "./ui/button";
import { setConfirmCancelId, setConfirmSellId } from "@/state/orderSlice";
import {
  useCancelTradeMutation,
  useSellPositionMutation,
} from "@/state/api/apex";
import StatusBadge from "./StatusBadge";
import PriceBar from "./PriceBar";
import OpenPositionPlaceholder from "./OpenPositions";
import BaseTrade from "@/interfaces/BaseTrade";
import Trade from "@/interfaces/Trade";
import OpenPositions from "./OpenPositions";

const Positions: React.FC = () => {
  return (
    <div id="orders">
      <div className="positions mb-8 md:w-full">
        <OrderFilter />
        <OpenPositions />
        {/*         
        {openOrders.map((order) => (
          <OpenPosition trade={trade} />
        ))} */}
      </div>
      {/* <div className="orders">
        <p className="text-sm font-normal mb-4">{`Orders (${orderList.length})`}</p>
        {orderList.map((order) => {
          const { leg, status, id } = order;
          const symbol: string = leg[0].optionSymbol;
          const symbolLabel: string = convertTickerWithExpiration(symbol);

          return (
            <Accordion
              key={id}
              type="single"
              collapsible
              className="w-full order-accordion mb-3"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="accordion-title">{symbolLabel}</div>
                  <StatusBadge status={status as TradeStatus} />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="accordion-content">
                    <div className="accordion-row">
                      <div className="cell font-normal accordion-label">
                        Average
                      </div>
                      <div className="cell accordion-price">
                        {leg[0].price?.toFixed(2)}
                      </div>
                      <div className="cell accordion-status">
                        <StatusBadge status={leg[0].status as TradeStatus} />
                      </div>
                    </div>
                    <div className="accordion-row">
                      <div className="cell font-normal accordion-label">
                        Limit
                      </div>
                      <div className="cell accordion-price">
                        {leg[1].price?.toFixed(2)}
                      </div>
                      <div className="cell accordion-status">
                        <StatusBadge status={leg[1].status as TradeStatus} />
                      </div>
                    </div>
                    <div className="accordion-row">
                      <div className="cell font-normal accordion-label">
                        Stop
                      </div>
                      <div className="cell accordion-price">
                        {leg[2].stopPrice?.toFixed(2)}
                      </div>
                      <div className="cell accordion-status">
                        <StatusBadge status={leg[2].status as TradeStatus} />
                      </div>
                    </div>
                    {status === TradeStatus.OPEN && (
                      <div className="order-position mt-3">
                        <OpenPosition order={order} />
                      </div>
                    )}
                    {status === TradeStatus.PENDING && (
                      <div className="order-actions mt-3 pr-4">
                        {id === confirmCancelId ? (
                          <>
                            <p>Cancel order?</p>
                            <Button
                              onClick={async () =>
                                await cancelTrade({ orderId: id })
                              }
                            >
                              Yes
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => dispatch(setConfirmCancelId(null))}
                            >
                              No
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={() => dispatch(setConfirmCancelId(id))}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    )}
                    {(status as TradeStatus) === TradeStatus.OPEN && (
                      <div className="order-actions mt-3 pr-4">
                        {id === confirmSellId ? (
                          <>
                            <p>Sell position?</p>
                            <Button
                              onClick={async () =>
                                await sellPosition({
                                  triggerId: leg[0].id,
                                  limitId: leg[1].id,
                                  stopId: leg[2].id,
                                })
                              }
                            >
                              Yes
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => dispatch(setConfirmSellId(null))}
                            >
                              No
                            </Button>
                          </>
                        ) : (
                          // <Button
                          //   onClick={() => dispatch(setConfirmSellId(id))}
                          // >
                          //   Sell
                          // </Button>
                          <></>
                        )}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div> */}
    </div>
  );
};

export default Positions;
