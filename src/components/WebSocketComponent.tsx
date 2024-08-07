import { LiveOption } from "@/interfaces/LiveOption";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

// type LiveOptionMap = Map<string, LiveOption | null>;
// type LiveQuoteMap = Map<string, number | null>;

interface WebSocketComponentProps {
  setIsOpen: (isOpen: boolean) => void;
  updateQuote: (symbol: string, newQuote: LiveOption | null) => void;
  updateQuotePrices: (
    symbol: string,
    newPrice: number | null,
    isFromOnMessage: boolean
  ) => void;
  // quotePrices: LiveOptionMap;
}

const WebSocketComponent: React.FC<WebSocketComponentProps> = ({
  setIsOpen,
  updateQuote,
  updateQuotePrices,
}) => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/ws");

    ws.current.onopen = () => {
      toast("WebSocket connection open", {
        duration: 3000,
        position: "bottom-center",
      });

      setIsOpen(true);
    };

    ws.current.onmessage = (event) => {
      const newMessage: LiveOption = JSON.parse(event.data);
      updateQuote(newMessage.symbol, newMessage);
      updateQuotePrices(newMessage.symbol, newMessage.ask, true);
    };

    ws.current.onclose = (event) => {
      setIsOpen(false);
      console.log("WebSocket connection closed:", event);
      if (event.code !== 1000) {
        // Automatically try to reconnect if not a normal closure
        console.log("Attempting to reconnect...");
        ws.current = new WebSocket("ws://localhost:8080/ws");
      }
    };

    ws.current.onerror = (event) => {
      console.error("WebSocket error:", event);
      if (event instanceof ErrorEvent) {
        console.error("Error message:", event.message);
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close(1000, "Component unmounting");
      }
    };
  }, []);

  // const sendMessage = (message: string) => {
  //   if (ws.current && ws.current.readyState === WebSocket.OPEN) {
  //     ws.current.send(message);
  //   } else {
  //     console.log("WebSocket connection is not open");
  //   }
  // };

  return <div></div>;
};

export default WebSocketComponent;
