import BaseTrade from '@/interfaces/BaseTrade';
import LottoTrade from '@/interfaces/LottoTrade';
import VisionTrade from '@/interfaces/VisionTrade';
import HeroTrade from '@/interfaces/HeroTrade';

type Trade = BaseTrade | LottoTrade | VisionTrade | HeroTrade;

export default Trade;
