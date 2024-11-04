import { TradeStatus, OrderStatuses } from '@/constants';
import { Badge } from '../ui/badge';

export const BadgeRejected: React.FC = () => (
    <Badge className='badge rounded badge-rejected'>
        {TradeStatus.REJECTED}
    </Badge>
);
