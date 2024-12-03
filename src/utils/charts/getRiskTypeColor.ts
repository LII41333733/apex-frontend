import { RiskType } from '@/constants';

export default function (riskType: RiskType) {
    switch (riskType) {
        case RiskType.LOTTO:
            return 'hsl(var(--lotto-chart))';
        case RiskType.VISION:
            return 'hsl(var(--vision-chart))';
        case RiskType.HERO:
            return 'hsl(var(--hero-chart))';
        case RiskType.BASE:
        default:
            return 'hsl(var(--base-chart))';
    }
}
