import { OrderStatuses } from "@/constants";
import { Badge } from "../ui/badge";

export const BadgeCanceled: React.FC = () => (
  <Badge className="badge rounded badge-canceled bg-trade-red hover:bg-trade-red">
    {OrderStatuses.CANCELED}
  </Badge>
);
