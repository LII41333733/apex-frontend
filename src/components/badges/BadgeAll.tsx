import { OrderStatuses } from "@/constants";
import { Badge } from "../ui/badge";

export const BadgeAll: React.FC = () => (
  <Badge className="badge badge-all">{OrderStatuses.ALL}</Badge>
);
