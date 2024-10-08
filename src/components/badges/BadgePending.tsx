import { OrderStatuses } from "@/constants";
import { Badge } from "../ui/badge";

export const BadgePending: React.FC = () => (
  <Badge className="badge badge-pending">{OrderStatuses.PENDING}</Badge>
);
