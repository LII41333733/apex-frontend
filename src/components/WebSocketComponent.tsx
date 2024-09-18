import { SYMBOLS, WebSocketData } from "@/constants";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/state/hooks";
import { updateAll } from "@/state/balanceSlice";
import { updateQuotesMap } from "@/state/optionsChainSlice";
import { updateOrderSummary } from "@/state/orderSlice";
import { updateTrades, updateTradeSummary } from "@/state/tradeSlice";
import { updateIWMData, updateQQQData, updateSPYData } from "@/state/mainSlice";

const getPriceData = (
  symbol: string,
  data: { last: string; change: string; change_percentage: string }
) => ({
  symbol,
  price: parseFloat(data.last).toFixed(2),
  changeDollars: parseFloat(data.change).toFixed(2),
  changePercentage: parseFloat(data.change_percentage).toFixed(2),
});

const WebSocketComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const ws = useRef<WebSocket | null>(null);
  const reconnectInterval = useRef<NodeJS.Timeout | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const isConnectedRef = useRef(isConnected);

  // Track initial window focus
  const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus());

  useEffect(() => {
    isConnectedRef.current = isConnected;
  }, [isConnected]);

  const initializeWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:8080/ws");

    ws.current.onopen = () => {
      // console.log("WebSocket connection Open");
      setIsConnected(true);
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current);
        reconnectInterval.current = null;
      }
    };

    ws.current.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);

      // console.log({ type, data });

      switch (type) {
        case WebSocketData.BALANCE:
          dispatch(updateAll(data));
          break;
        case WebSocketData.QUOTE:
          dispatch(updateQuotesMap(data));
          break;
        case WebSocketData.ORDER_SUMMARY:
          dispatch(updateOrderSummary(data));
          break;
        case WebSocketData.TRADE_SUMMARY:
          dispatch(updateTradeSummary(data));
          break;
        case WebSocketData.TRADES:
          dispatch(updateTrades(data));
          break;
        case WebSocketData.SPY:
          dispatch(updateSPYData(getPriceData(SYMBOLS.SPY, JSON.parse(data))));
          break;
        case WebSocketData.QQQ:
          dispatch(updateQQQData(getPriceData(SYMBOLS.QQQ, JSON.parse(data))));
          break;
        case WebSocketData.IWM:
          dispatch(updateIWMData(getPriceData(SYMBOLS.IWM, JSON.parse(data))));
          break;
        default:
          console.error("Unknown WebSocket data type:", type);
      }
    };

    ws.current.onclose = (event) => {
      // console.log("WebSocket Connection Closed:", event);
      setIsConnected(false);
      if (event.code !== 1000) {
        startReconnection();
      }
    };

    ws.current.onerror = (event) => {
      // console.error("WebSocket error:", event);
      ws.current?.close();
    };
  };

  const startReconnection = () => {
    if (!reconnectInterval.current) {
      reconnectInterval.current = setInterval(() => {
        if (document.hasFocus() && !isConnectedRef.current) {
          // console.log("Attempting to reconnect WebSocket...");
          initializeWebSocket();
        }
      }, 2000);
    }
  };

  const handleWindowFocus = () => {
    setIsWindowFocused(true);
    if (!isConnectedRef.current) {
      startReconnection();
    }
  };

  const handleWindowBlur = () => {
    setIsWindowFocused(false);
  };

  useEffect(() => {
    initializeWebSocket();

    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("blur", handleWindowBlur);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && document.hasFocus()) {
        handleWindowFocus();
      } else {
        handleWindowBlur();
      }
    });

    return () => {
      if (ws.current) {
        ws.current.close(1000, "Component unmounting");
      }
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current);
      }
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("visibilitychange", handleWindowFocus);
    };
  }, []);

  return <div></div>;
};

export default WebSocketComponent;
