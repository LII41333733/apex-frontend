import { OrderStatuses } from '@/constants';
import { Badge } from '../ui/badge';

export const BadgeAll: React.FC = () => (
    <Badge className='badge rounded badge-all bg-apex-light-yellow hover:bg-primary'>
        {OrderStatuses.ALL}
    </Badge>
);
