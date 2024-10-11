import { OrderStatuses } from "@/constants";
import { Badge } from "../ui/badge";

export const BadgeOpen: React.FC = () => (
  <Badge className="badge badge-open bg-status-open">
    {OrderStatuses.OPEN}
  </Badge>
);
