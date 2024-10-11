import { OrderStatuses } from "@/constants";
import { Badge } from "../ui/badge";

export const BadgeCanceled: React.FC = () => (
  <Badge className="badge badge-canceled bg-trade-red hover:">
    {OrderStatuses.CANCELED}
  </Badge>
);
