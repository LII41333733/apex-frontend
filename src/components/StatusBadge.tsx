import { OrderDataStatuses } from "@/constants";
import { BadgeCanceled } from "./badges/BadgeCanceled";
import { BadgePending } from "./badges/BadgePending";
import { BadgeOpen } from "./badges/BadgeOpen";
import { BadgeFilled } from "./badges/BadgeFilled";

const StatusBadge: React.FC<{ status: OrderDataStatuses }> = ({ status }) => {
  switch (status) {
    case OrderDataStatuses.CANCELED:
      return <BadgeCanceled />;
    case OrderDataStatuses.PENDING:
      return <BadgePending />;
    case OrderDataStatuses.OPEN:
      return <BadgeOpen />;
    case OrderDataStatuses.FILLED:
      return <BadgeFilled />;
  }
};

export default StatusBadge;
