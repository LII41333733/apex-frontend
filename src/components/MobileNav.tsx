import React from "react";
import BalanceBar from "./BalanceBar";
import TickerBar from "./TickerBar";

const MobileNav: React.FC = () => {
  return (
    <div className="mobile-nav">
      <BalanceBar />
      <TickerBar />
    </div>
  );
};

export default MobileNav;
