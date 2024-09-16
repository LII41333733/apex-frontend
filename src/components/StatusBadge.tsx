import { BaseTradeStatus, TradeStatus } from "@/constants";
import { BadgeCanceled } from "./badges/BadgeCanceled";
import { BadgePending } from "./badges/BadgePending";
import { BadgeOpen } from "./badges/BadgeOpen";
import { BadgeFilled } from "./badges/BadgeFilled";
import { BadgeRunners } from "./badges/BadgeRunners";
import { BadgeRejected } from "./badges/BadgeRejected";

const StatusBadge: React.FC<{ status: BaseTradeStatus }> = ({ status }) => {
  switch (status) {
    case BaseTradeStatus.CANCELED:
      return <BadgeCanceled />;
    case BaseTradeStatus.REJECTED:
      return <BadgeRejected />;
    case BaseTradeStatus.PENDING:
    case BaseTradeStatus.PREOPEN:
      return <BadgePending />;
    case BaseTradeStatus.OPEN:
      return <BadgeOpen />;
    case BaseTradeStatus.FILLED:
      return <BadgeFilled />;
    case BaseTradeStatus.RUNNERS:
      return <BadgeRunners />;
  }
};

export default StatusBadge;
