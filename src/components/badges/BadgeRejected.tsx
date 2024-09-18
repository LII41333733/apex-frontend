import { BaseTradeStatus, OrderStatuses } from "@/constants";
import { Badge } from "../ui/badge";

export const BadgeRejected: React.FC = () => (
  <Badge className="badge badge-rejected">{BaseTradeStatus.REJECTED}</Badge>
);