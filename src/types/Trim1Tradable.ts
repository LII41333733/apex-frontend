import BaseTrade from '@/interfaces/BaseTrade';
import LottoTrade from '@/interfaces/LottoTrade';
import VisionTrade from '@/interfaces/VisionTrade';

export type Trim1Tradable = BaseTrade | VisionTrade | LottoTrade;
