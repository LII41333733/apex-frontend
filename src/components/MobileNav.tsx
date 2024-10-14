import React from "react";
import BalanceBar from "./BalanceBarMobile";
import TickerBar from "./TickerBar";

const MobileNav: React.FC = () => {
  return (
    <div className="mobile-nav mb-4 block md:hidden pt-3">
      <BalanceBar />
      <TickerBar />
    </div>
  );
};

export default MobileNav;
