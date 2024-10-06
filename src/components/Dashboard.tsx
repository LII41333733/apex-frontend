import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardView } from "@/constants";
import React from "react";
import TradesTable from "./TradesTable";
import EquityChart from "./EquityChart";

export const description =
  "An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image. The main content area is divided into two rows. The first row has a grid of cards with statistics. The second row has a grid of cards with a table of recent transactions and a list of recent sales.";

const Dashboard: React.FC = () => {
  const [dashboardView, setDashboardView] = React.useState<DashboardView>(
    DashboardView.HOME
  );
  return (
    <div className="dashboard flex min-h-screen w-full flex-col">
      <header className="dashboard-header top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <div
            onClick={() => setDashboardView(DashboardView.HOME)}
            className="text-foreground transition-colors hover:text-foreground"
          >
            Portfolio
          </div>
          <div
            onClick={() => setDashboardView(DashboardView.TRADES)}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Trades
          </div>
          <div
            onClick={() => setDashboardView(DashboardView.ANALYTICS)}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Analytics
          </div>
          <div
            onClick={() => setDashboardView(DashboardView.VISION)}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Vision
          </div>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <div
                onClick={() => setDashboardView(DashboardView.HOME)}
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <span className="sr-only">Acme Inc</span>
              </div>
              <div
                onClick={() => setDashboardView(DashboardView.HOME)}
                className="hover:text-foreground"
              >
                Dashboard
              </div>
              <div
                onClick={() => setDashboardView(DashboardView.HOME)}
                className="text-muted-foreground hover:text-foreground"
              >
                Trades
              </div>
              <div
                onClick={() => setDashboardView(DashboardView.HOME)}
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </div>
              <div
                onClick={() => setDashboardView(DashboardView.VISION)}
                className="text-muted-foreground hover:text-foreground"
              >
                Vision
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex  items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Trades"
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
        </div>
      </header>
      <hr />
      {dashboardView === DashboardView.HOME && (
        <main className="stats flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <div className="apex-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Equity
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="stats-main text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last year
                </p>
              </CardContent>
            </div>
            <div className="apex-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly P/L
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="stats-main text-2xl font-bold">+$2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </div>
            <div className="apex-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Weekly P/L
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="stats-main text-2xl font-bold">+$12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last week
                </p>
              </CardContent>
            </div>
            <div className="apex-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's P/L
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="stats-main text-2xl font-bold">+$573</div>
                <p className="text-xs text-muted-foreground">
                  +20% from yesterday
                </p>
              </CardContent>
            </div>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-2 apex-card">
              <EquityChart />
            </div>
            <div className="apex-card">
              <CardHeader>
                <CardTitle>Today's Trades</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                <div className="flex items-center gap-4">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      SPY 575P 10/4
                    </p>
                    <p className="text-sm text-muted-foreground">Base Trade</p>
                  </div>
                  <div className="yellow ml-auto font-medium">+$1,999.00</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      QQQ 444P 10/4
                    </p>
                    <p className="text-sm text-muted-foreground">Base Trade</p>
                  </div>
                  <div className="yellow ml-auto font-medium">+$39.00</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      TSLA 275C 10/4
                    </p>
                    <p className="text-sm text-muted-foreground">Base Trade</p>
                  </div>
                  <div className="yellow ml-auto font-medium">+$39.00</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      SPY 575P 10/4
                    </p>
                    <p className="text-sm text-muted-foreground">Base Trade</p>
                  </div>
                  <div className="yellow ml-auto font-medium">+$39.00</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      GOOGL 500C 10/4
                    </p>
                    <p className="text-sm text-muted-foreground">Base Trade</p>
                  </div>
                  <div className="yellow ml-auto font-medium">+$299.00</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      AAPL 305P 10/4
                    </p>
                    <p className="text-sm text-muted-foreground">Base Trade</p>
                  </div>
                  <div className="yellow ml-auto font-medium">+$99.00</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      SPY 575P 10/4
                    </p>
                    <p className="text-sm text-muted-foreground">Base Trade</p>
                  </div>
                  <div className="yellow ml-auto font-medium">+$39.00</div>
                </div>
              </CardContent>
            </div>
          </div>
        </main>
      )}
      {dashboardView === DashboardView.TRADES && <TradesTable />}
    </div>
  );
};

export default Dashboard;
