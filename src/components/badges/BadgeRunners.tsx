import { OrderStatuses } from "@/constants";
import { Badge } from "../ui/badge";

export const BadgeRunners: React.FC = () => (
  <Badge className="badge badge-runners bg-status-runners">
    {OrderStatuses.RUNNERS}
  </Badge>
);
