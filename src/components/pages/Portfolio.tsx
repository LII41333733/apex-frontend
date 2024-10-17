import React from "react";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EquityChart from "../EquityChart";

const Portfolio: React.FC = () => {
  return (
    <div className="dashboard flex w-full flex-col">
      <main className="stats flex flex-1 flex-col gap-4 p-0 md:gap-6">
        <div className="grid gap-4 md:grid-cols-1 md:gap-8 lg:grid-cols-5">
          <div className="apex-card card w-[100%]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-2">
              <CardTitle className="text-sm font-medium">
                Total Equity
              </CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent className="pb-4">
              <div className="stats-main text-2xl font-bold text-apex-light-yellow">
                $45,231.89
              </div>
              <p className="text-xs">+20.1% from last year</p>
            </CardContent>
          </div>
          <div className="apex-card card w-[100%]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-2">
              <CardTitle className="text-sm font-medium">Monthly P/L</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent className="pb-4">
              <div className="stats-main text-2xl font-bold text-apex-light-yellow">
                +$2350
              </div>
              <p className="text-xs">+180.1% from last month</p>
            </CardContent>
          </div>
          <div className="apex-card card w-[100%]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-2">
              <CardTitle className="text-sm font-medium">Weekly P/L</CardTitle>
              <CreditCard className="h-4 w-4" />
            </CardHeader>
            <CardContent className="pb-4">
              <div className="stats-main text-2xl font-bold text-apex-light-yellow">
                +$12,234
              </div>
              <p className="text-xs">+19% from last week</p>
            </CardContent>
          </div>
          <div className="apex-card card w-[100%]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-2">
              <CardTitle className="text-sm font-medium">Today's P/L</CardTitle>
              <Activity className="h-4 w-4" />
            </CardHeader>
            <CardContent className="pb-4">
              <div className="stats-main text-2xl font-bold text-apex-light-yellow">
                +$573
              </div>
              <p className="text-xs">+20% from yesterday</p>
            </CardContent>
          </div>
          <div className="apex-card card w-[100%]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-2">
              <CardTitle className="text-sm font-medium">Today's P/L</CardTitle>
              <Activity className="h-4 w-4" />
            </CardHeader>
            <CardContent className="pb-4">
              <div className="stats-main text-2xl font-bold text-apex-light-yellow">
                +$573
              </div>
              <p className="text-xs">+20% from yesterday</p>
            </CardContent>
          </div>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="col-span-2 apex-card card">
            <EquityChart />
          </div>
          <div className="apex-card card">
            <CardContent className="grid gap-6 mt-8">
              <div className="flex flex-row center items-center justify-start">
                <CardTitle className="mr-20">Latest Trades</CardTitle>
                <CardTitle className="ml-14 mr-12">% P/L</CardTitle>
                <CardTitle className="ml-0">$ P/L</CardTitle>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="grid gap-0">
                  <p className="text-top text-apex-light-yellow font-medium leading-none w-[13rem]">
                    SPY 575P 10/4
                  </p>
                  <p className="italic text-xs text-foreground tracking-wide">
                    BASE TRADE
                  </p>
                </div>
                <div className="text-trade-green ml-auto font-medium w-[4rem]">
                  100%
                </div>
                <div className="ml-auto text-trade-red font-lg w-[5rem]">
                  +$1,999.00
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-top text-apex-light-yellow font-medium leading-none w-[13rem]">
                    QQQ 444P 10/4
                  </p>
                  <p className="italic text-xs text-foreground tracking-wide">
                    BASE TRADE
                  </p>
                </div>
                <div className="text-trade-green ml-auto font-medium w-[4rem]">
                  100%
                </div>
                <div className="ml-auto text-trade-red font-lg w-[5rem]">
                  +$39.00
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-top text-apex-light-yellow font-medium leading-none w-[13rem]">
                    TSLA 275C 10/4
                  </p>
                  <p className="italic text-xs text-foreground tracking-wide">
                    BASE TRADE
                  </p>
                </div>
                <div className="text-trade-green ml-auto font-medium w-[4rem]">
                  100%
                </div>
                <div className="ml-auto text-trade-red font-lg w-[5rem]">
                  +$39.00
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-top text-apex-light-yellow font-medium leading-none w-[13rem]">
                    SPY 575P 10/4
                  </p>
                  <p className="italic text-xs text-foreground tracking-wide">
                    BASE TRADE
                  </p>
                </div>
                <div className="text-trade-green ml-auto font-medium w-[4rem]">
                  100%
                </div>
                <div className="ml-auto text-trade-red font-lg w-[5rem]">
                  +$39.00
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-top text-apex-light-yellow font-medium leading-none w-[13rem]">
                    GOOGL 500C 10/4
                  </p>
                  <p className="italic text-xs text-foreground tracking-wide">
                    BASE TRADE
                  </p>
                </div>
                <div className="text-trade-green ml-auto font-medium w-[4rem]">
                  100%
                </div>
                <div className="ml-auto text-trade-red font-lg w-[5rem]">
                  +$299.00
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-top text-apex-light-yellow font-medium leading-none w-[13rem]">
                    GOOGL 500C 10/4
                  </p>
                  <p className="italic text-xs text-foreground tracking-wide">
                    BASE TRADE
                  </p>
                </div>
                <div className="text-trade-green ml-auto font-medium w-[4rem]">
                  100%
                </div>
                <div className="ml-auto text-trade-red font-lg w-[5rem]">
                  +$299.00
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-top text-apex-light-yellow font-medium leading-none w-[13rem]">
                    GOOGL 500C 10/4
                  </p>
                  <p className="italic text-xs text-foreground tracking-wide">
                    BASE TRADE
                  </p>
                </div>
                <div className="text-trade-green ml-auto font-medium w-[4rem]">
                  100%
                </div>
                <div className="ml-auto text-trade-red font-lg w-[5rem]">
                  +$299.00
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-top text-apex-light-yellow font-medium leading-none w-[13rem]">
                    AAPL 305P 10/4
                  </p>
                  <p className="italic text-xs text-foreground tracking-wide">
                    BASE TRADE
                  </p>
                </div>
                <div className="text-trade-green ml-auto font-medium w-[4rem]">
                  100%
                </div>
                <div className="ml-auto text-trade-red font-lg w-[5rem]">
                  +$99.00
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-top text-apex-light-yellow font-medium leading-none w-[13rem]">
                    SPY 575P 10/4
                  </p>
                  <p className="italic text-xs text-foreground tracking-wide">
                    BASE TRADE
                  </p>
                </div>
                <div className="text-trade-green ml-auto font-medium w-[4rem]">
                  100%
                </div>
                <div className="ml-auto text-trade-red font-lg w-[5rem]">
                  +$39.00
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
