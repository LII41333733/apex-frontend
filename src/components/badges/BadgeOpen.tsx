import { OrderStatuses } from '@/constants';
import { Badge } from '../ui/badge';

export const BadgeOpen: React.FC = () => (
    <Badge className='badge badge-open rounded bg-status-open hover:bg-status-open'>
        {OrderStatuses.OPEN}
    </Badge>
);
