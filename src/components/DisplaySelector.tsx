import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Displays } from "@/constants";
import { initialState, updateDisplay } from "@/state/mainSlice";
import React from "react";

const DisplaySelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    orderSummary: { openOrders, pendingOrders },
  } = useAppSelector((state) => state.orders);
  const hasOpenOrders = openOrders.length;
  const hasPendingOrders = pendingOrders.length;
  const hasBothOpenAndPendingOrders = hasOpenOrders && hasPendingOrders;

  return (
    <Tabs
      defaultValue={initialState.display}
      className="display-selector w-[100%] display-tab mt-3 mb-3"
    >
      <TabsList className="w-[100%] flex justify-between">
        <TabsTrigger
          onClick={() => {
            dispatch(updateDisplay(Displays.POSITIONS));
          }}
          value={Displays.POSITIONS}
        >
          <>
            {Displays.POSITIONS}
            <PositionIcon
              hasOpenOrders={hasOpenOrders}
              hasPendingOrders={hasPendingOrders}
              hasBothOpenAndPendingOrders={hasBothOpenAndPendingOrders}
            />
          </>
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            dispatch(updateDisplay(Displays.CHAIN));
          }}
          value={Displays.CHAIN}
        >
          {Displays.CHAIN}
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            dispatch(updateDisplay(Displays.TRADES));
          }}
          value={Displays.TRADES}
        >
          {Displays.TRADES}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

const PositionIcon: React.FC<{
  hasOpenOrders: number;
  hasPendingOrders: number;
  hasBothOpenAndPendingOrders: number;
}> = ({ hasOpenOrders, hasPendingOrders, hasBothOpenAndPendingOrders }) => {
  if (hasBothOpenAndPendingOrders) {
    return (
      <>
        <span className="icon text-status-open ml-2 text-lg inline-block">
          ◖
        </span>
        <span className="icon second-half text-status-pending text-lg inline-block">
          ◗
        </span>
      </>
    );
  }

  if (hasOpenOrders) {
    return (
      <span className="icon text-status-open ml-2 text-lg inline-block">●</span>
    );
  }

  if (hasPendingOrders) {
    return (
      <span className="icon text-status-pending ml-2 text-lg inline-block">
        ●
      </span>
    );
  }

  return <></>;
};

export default DisplaySelector;
