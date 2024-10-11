import { OrderStatuses } from "@/constants";
import { Badge } from "../ui/badge";

export const BadgeAll: React.FC = () => (
  <Badge className="badge badge-all bg-primary">{OrderStatuses.ALL}</Badge>
);
