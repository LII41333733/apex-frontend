import React from "react";
import store from "./state/store";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import BalanceBar from "./components/BalanceBar";
import WebSocketComponent from "./components/WebSocketComponent";
import OptionsChain from "./components/OptionsChain";
import DisplaySelector from "./components/DisplaySelector";
import { useAppSelector } from "./state/hooks";
import Orders from "./components/Orders";
import TickerBar from "./components/TickerBar";
import { Displays } from "./constants";
import "./App.css";
import "./index.css";
import { Trades } from "./components/Trades";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="main-container px-4 py-4">
          <BalanceBar />
          <TickerBar />
          <DisplaySelector />
          <RenderDisplay />
        </div>
        <WebSocketComponent />
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}

const RenderDisplay: React.FC = () => {
  const { display } = useAppSelector((state) => state.main);

  switch (display) {
    case Displays.POSITIONS: {
      return <Orders />;
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
