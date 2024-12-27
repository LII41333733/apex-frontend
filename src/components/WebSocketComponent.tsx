import { WebSocketData } from '@/constants';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/state/hooks';
import { updateAll } from '@/state/balanceSlice';
import { updateQuotesMap } from '@/state/optionsChainSlice';
import { updateOrderSummary } from '@/state/orderSlice';
import {
    updateTradeProfiles,
    updateTrades,
    updateTradeSummary,
} from '@/state/tradeSlice';
import { updateSymbolData } from '@/state/mainSlice';

const getPriceData = (data: {
    symbol: string;
    last: string;
    change: string;
    change_percentage: string;
}) => ({
    symbol: data.symbol,
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
    // const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus());

    useEffect(() => {
        isConnectedRef.current = isConnected;
    }, [isConnected]);

    const initializeWebSocket = () => {
        ws.current = new WebSocket('ws://localhost:8080/ws');

        ws.current.onopen = () => {
            setIsConnected(true);
            if (reconnectInterval.current) {
                clearInterval(reconnectInterval.current);
                reconnectInterval.current = null;
            }
        };

        ws.current.onmessage = (event) => {
            const { type, data } = JSON.parse(event.data);

            switch (type) {
                case WebSocketData.BALANCE:
                    dispatch(updateAll(data));
                    break;
                case WebSocketData.TradeProfiles:
                    dispatch(updateTradeProfiles(data));
                    break;
                case WebSocketData.QUOTE:
                    dispatch(updateQuotesMap(data));
                    break;
                case WebSocketData.POSITIONS:
                    dispatch(updateTradeSummary(data));
                    break;
                case WebSocketData.TRADES:
                case WebSocketData.DEMO_TRADES:
                    dispatch(updateTrades(data));
                    break;
                case WebSocketData.SYMBOLS:
                    dispatch(
                        updateSymbolData(
                            JSON.parse(data).map((e: any) => getPriceData(e))
                        )
                    );
                    break;
                default:
                    console.error('Unknown WebSocket data type:', type);
            }
        };

        ws.current.onclose = (event) => {
            setIsConnected(false);
            if (event.code !== 1000) {
                startReconnection();
            }
        };

        ws.current.onerror = (event) => {
            ws.current?.close();
        };
    };

    const startReconnection = () => {
        if (!reconnectInterval.current) {
            reconnectInterval.current = setInterval(() => {
                if (document.hasFocus() && !isConnectedRef.current) {
                    initializeWebSocket();
                }
            }, 2000);
        }
    };

    const handleWindowFocus = () => {
        // setIsWindowFocused(true);
        if (!isConnectedRef.current) {
            startReconnection();
        }
    };

    // const handleWindowBlur = () => {
    //   setIsWindowFocused(false);
    // };

    useEffect(() => {
        initializeWebSocket();

        window.addEventListener('focus', handleWindowFocus);
        // window.addEventListener("blur", handleWindowBlur);

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && document.hasFocus()) {
                handleWindowFocus();
            }
            // else {
            //   handleWindowBlur();
            // }
        });

        return () => {
            if (ws.current) {
                ws.current.close(1000, 'Component unmounting');
            }
            if (reconnectInterval.current) {
                clearInterval(reconnectInterval.current);
            }
            window.removeEventListener('focus', handleWindowFocus);
            // window.removeEventListener("blur", handleWindowBlur);
            document.removeEventListener('visibilitychange', handleWindowFocus);
        };
    }, []);

    return <div></div>;
};

export default WebSocketComponent;
