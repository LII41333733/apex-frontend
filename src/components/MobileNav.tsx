import React from "react";
import BalanceBar from "./BalanceBar";
import TickerBar from "./TickerBar";

const MobileNav: React.FC = () => {
  return (
    <div className="mobile-nav mb-4 block sm:hidden">
      <BalanceBar />
      <TickerBar />
    </div>
  );
};

export default MobileNav;
