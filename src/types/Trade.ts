import BaseTrade from '@/interfaces/BaseTrade';
import LottoTrade from '@/interfaces/LottoTrade';
import VisionTrade from '@/interfaces/VisionTrade';

type Trade = BaseTrade | LottoTrade | VisionTrade;

export default Trade;
