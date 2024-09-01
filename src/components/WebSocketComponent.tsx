import { WebSocketData } from "@/constants";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/state/hooks";
import { updateAll } from "@/state/balanceSlice";
import { updateQuotesMap } from "@/state/optionsChainSlice";
import { updateOrderSummary } from "@/state/orderSlice";
import { updateTrades } from "@/state/tradeSlice";

const WebSocketComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const ws = useRef<WebSocket | null>(null);
  const reconnectInterval = useRef<NodeJS.Timeout | null>(null);

  // Use useState for isConnected and useRef to keep track of its latest value
  const [isConnected, setIsConnected] = useState(false);
  const isConnectedRef = useRef(isConnected);

  // Track initial window focus
  const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus());

  // Update the isConnectedRef whenever isConnected state changes
  useEffect(() => {
    isConnectedRef.current = isConnected;
  }, [isConnected]);

  // Function to initialize WebSocket
  const initializeWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:8080/ws");

    ws.current.onopen = () => {
      console.log("WebSocket connection Open");
      setIsConnected(true);
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current); // Stop reconnection attempts
        reconnectInterval.current = null;
      }
    };

    ws.current.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);

      console.log({ type, data });

      switch (type) {
        case WebSocketData.BALANCE:
          dispatch(updateAll(data));
          break;
        case WebSocketData.QUOTE:
          console.log(data);
          dispatch(updateQuotesMap(data));
          break;
        case WebSocketData.ORDER_SUMMARY:
          dispatch(updateOrderSummary(data));
          break;
        case WebSocketData.TRADES:
          dispatch(updateTrades(data));
          break;
        default:
          console.error("Unknown WebSocket data type:", type);
      }
    };

    ws.current.onclose = (event) => {
      // console.log("WebSocket Connection Closed:", event);
      setIsConnected(false);
      if (event.code !== 1000) {
        startReconnection(); // Start reconnection attempts
      }
    };

    ws.current.onerror = (event) => {
      // console.error("WebSocket error:", event);
      ws.current?.close(); // Close the socket on error to trigger reconnection
    };
  };

  // Function to start reconnection attempts
  const startReconnection = () => {
    if (!reconnectInterval.current) {
      reconnectInterval.current = setInterval(() => {
        // Check both if the document is visible and the window is focused
        if (document.hasFocus() && !isConnectedRef.current) {
          console.log("Attempting to reconnect WebSocket...");
          initializeWebSocket();
        }
      }, 2000); // Attempt to reconnect every 2 seconds
    }
  };

  // Handle window focus and blur events
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

    // Listen for window focus and blur events
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("blur", handleWindowBlur);

    // Visibility API listener for additional reliability
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
