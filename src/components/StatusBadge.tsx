import { TradeStatus } from '@/constants';
import { BadgeCanceled } from './badges/BadgeCanceled';
import { BadgePending } from './badges/BadgePending';
import { BadgeOpen } from './badges/BadgeOpen';
import { BadgeFilled } from './badges/BadgeFilled';
import { BadgeRunners } from './badges/BadgeRunners';
import { BadgeRejected } from './badges/BadgeRejected';

const StatusBadge: React.FC<{ status: TradeStatus }> = ({ status }) => {
    switch (status) {
        case TradeStatus.CANCELED:
            return <BadgeCanceled />;
        case TradeStatus.REJECTED:
            return <BadgeRejected />;
        case TradeStatus.PENDING:
            return <BadgePending />;
        case TradeStatus.OPEN:
            return <BadgeOpen />;
        case TradeStatus.FILLED:
        case TradeStatus.FINALIZED:
            return <BadgeFilled />;
        case TradeStatus.RUNNERS:
            return <BadgeRunners />;
    }
};

export default StatusBadge;
