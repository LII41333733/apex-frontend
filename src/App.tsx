import React from "react";
import store from "./state/store";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import WebSocketComponent from "./components/WebSocketComponent";
import OptionsChain from "./components/OptionsChain";
import DisplaySelector from "./components/DisplaySelector";
import { useAppSelector } from "./state/hooks";
import Positions from "./components/Positions";
import { Displays } from "./constants";
import Trades from "./components/Trades";
import Login from "./components/Login";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";
import "./index.css";
import "./assets/scss/index.scss";

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

  React.useEffect(() => {
    if (token) {
      setTimeout(() => {
        const element2 = document.getElementById("main-container");
        element2?.classList.add("show");
        setTimeout(() => {
          element2?.classList.add("shown");
        }, 200);
      }, 500);
    }
  }, [token]);

  return token ? (
    <>
      <DesktopNav />
      <MobileNav />
      <div
        id="main-container"
        className="main-container fade-in sm:w-full md:w-[90%] max-w-[1440px]"
      >
        <DisplaySelector />
        <RenderDisplay />
      </div>
      <WebSocketComponent />
      <Toaster />
    </>
  ) : (
    <Login />
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
