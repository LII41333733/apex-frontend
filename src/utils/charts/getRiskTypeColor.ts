import { RiskType } from '@/constants';

export default function (riskType: RiskType) {
    switch (riskType) {
        case RiskType.Lotto:
            return 'hsl(var(--lotto-chart))';
        case RiskType.Vision:
            return 'hsl(var(--vision-chart))';
        case RiskType.Hero:
            return 'hsl(var(--hero-chart))';
        case RiskType.Base:
        default:
            return 'hsl(var(--base-chart))';
    }
}
