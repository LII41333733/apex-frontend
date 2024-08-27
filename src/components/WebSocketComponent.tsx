import { WebSocketData } from "@/constants";
import Balance from "@/interfaces/Balance";
import Quote from "@/interfaces/Quote";
import React, { useEffect, useRef } from "react";
import { useAppDispatch } from "@/state/hooks";
import { updateAll } from "@/state/balanceSlice";
import { updateQuotesMap } from "@/state/optionsChainSlice";
// import { useToast } from "@/components/ui/use-toast";

// interface WebSocketComponentProps {
//   setWebSocketConnected: (webSocketConnected: boolean) => void;
//   updateQuote: (symbol: string, newQuote: Quote) => void;
// }

const WebSocketComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  const ws = useRef<WebSocket | null>(null);
  // const { toast } = useToast();

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/ws");

    ws.current.onopen = () => {
      // setWebSocketConnected(true);
      console.log("WebSocket connection Open");
    };

    ws.current.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);

      switch (type) {
        case WebSocketData.BALANCE:
          dispatch(updateAll(data));
          break;
        case WebSocketData.QUOTE:
          dispatch(updateQuotesMap(data));
          break;
        default:
        // console.error(event);
        // console.error(data);
      }
    };

    ws.current.onclose = (event) => {
      // toast({
      //   title: "WebSocket connection closed",
      //   description: "",
      // });

      // setWebSocketConnected(false);
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
