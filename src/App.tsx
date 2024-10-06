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
import "./assets/scss/dashboard.scss";
import "./assets/scss/login.scss";
import "./index.css";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";

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
        console.log("2");
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
      <div id="main-container" className="main-container fade-in px-4 py-4">
        <DesktopNav />
        <MobileNav />
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
