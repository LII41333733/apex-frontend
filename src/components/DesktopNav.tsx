import React from "react";
import BalanceBar from "./BalanceBar";
import TickerBar from "./TickerBar";

const DesktopNav: React.FC = () => {
  return (
    <div className="desktop-nav">
      <div className="nav-data">
        <img
          className="pt-logo mr-3"
          src="src\assets\spin-gif.gif"
          alt="pt_logo"
        />
        <BalanceBar />
        <TickerBar />
      </div>
      <hr />
    </div>
  );
};

export default DesktopNav;
