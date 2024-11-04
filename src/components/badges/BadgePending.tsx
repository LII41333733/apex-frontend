import { OrderStatuses } from '@/constants';
import { Badge } from '../ui/badge';

export const BadgePending: React.FC = () => (
    <Badge className='badge rounded badge-pending bg-status-pending hover:bg-status-pending'>
        {OrderStatuses.PENDING}
    </Badge>
);
