import React from "react";
import BalanceBar from "./BalanceBar";
import TickerBar from "./TickerBar";

const DesktopNav: React.FC = () => {
  return (
    <div className="desktop-nav hidden sm:flex">
      <div className="nav-data">
        <BalanceBar />
        <TickerBar />
      </div>
      <hr />
    </div>
  );
};

export default DesktopNav;
