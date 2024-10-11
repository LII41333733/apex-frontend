import { OrderStatuses } from "@/constants";
import { Badge } from "../ui/badge";

export const BadgeFilled: React.FC = () => (
  <Badge className="badge badge-filled bg-trade-green">
    {OrderStatuses.FILLED}
  </Badge>
);
