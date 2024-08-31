import { WebSocketData } from "@/constants";
import Balance from "@/interfaces/Balance";
import Quote from "@/interfaces/Quote";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/state/hooks";
import { updateAll } from "@/state/balanceSlice";
import { updateQuotesMap } from "@/state/optionsChainSlice";
import { updateOrderSummary } from "@/state/ordersSlice";

const WebSocketComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectInterval = useRef<NodeJS.Timeout | null>(null);

  const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus()); // Track initial window focus

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
        if (document.hasFocus() && !isConnected) {
          initializeWebSocket(); //log("Reconnecting...");
        }
      }, 2000); // Attempt to reconnect every 5 seconds
    }
  };

  // Handle window focus and blur events
  const handleWindowFocus = () => {
    setIsWindowFocused(true);
    if (!isConnected) {
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
