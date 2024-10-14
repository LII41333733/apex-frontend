import { OrderStatuses } from "@/constants";
import { Badge } from "../ui/badge";

export const BadgeRunners: React.FC = () => (
  <Badge className="badge rounded badge-runners bg-status-runners hover:bg-status-runners">
    {OrderStatuses.RUNNERS}
  </Badge>
);
