import { OrderStatuses } from '@/constants';
import { Badge } from '../ui/badge';

export const BadgeFilled: React.FC = () => (
    <Badge className='badge rounded badge-filled bg-trade-green hover:bg-trade-green'>
        {OrderStatuses.FILLED}
    </Badge>
);
