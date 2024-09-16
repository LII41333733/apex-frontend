import React, { useState } from "react";
import store from "./state/store";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import BalanceBar from "./components/BalanceBar";
import WebSocketComponent from "./components/WebSocketComponent";
import OptionsChain from "./components/OptionsChain";
import DisplaySelector from "./components/DisplaySelector";
import { useAppSelector } from "./state/hooks";
import Positions from "./components/Positions";
import TickerBar from "./components/TickerBar";
import { Displays } from "./constants";
import "./App.css";
import "./index.css";
import { Trades } from "./components/Trades";
import Login from "./components/Login";

interface Data {
  message: string;
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Protected />
      </ThemeProvider>
    </Provider>
  );
}

const Protected: React.FC = () => {
  const token = useAppSelector((state) => state.main.token);

  return token ? (
    <>
      <div className="main-container px-4 py-4">
        <BalanceBar />
        <TickerBar />
        <DisplaySelector />
        <RenderDisplay />
      </div>
      <WebSocketComponent />
      <Toaster />
    </>
  ) : (
    <div className="main-container">
      <Login />
    </div>
  );
};

const RenderDisplay: React.FC = () => {
  const { display } = useAppSelector((state) => state.main);

  switch (display) {
    case Displays.POSITIONS: {
      return <Positions />;
    }
    case Displays.CHAIN: {
      return <OptionsChain />;
    }
    case Displays.TRADES: {
      return <Trades />;
    }
    default:
      return <></>;
  }
};

export default App;
