import { RiskType } from '@/constants';
import Trade from '@/types/Trade';

export default function (arr: Trade[], property: string) {
    if (!arr.length) return [];
    // Group objects by riskType
    const grouped = arr.reduce(
        (acc: { [key: string]: Trade[] }, obj: Trade) => {
            if (!acc[obj.riskType]) acc[obj.riskType] = [];
            acc[obj.riskType].push(obj);
            return acc;
        },
        {} as Trade
    );

    // Limit each group to the last 10 entries
    const result = {};
    for (const [key, value] of Object.entries(grouped)) {
        result[key] = value.slice(-20);
    }

    const data = [];

    for (let i = 0; i < 20; i++) {
        data.push({
            Base: result.Base[i][property],
            Lotto: result.Lotto[i][property],
            Vision: result.Vision[i][property],
            Hero: result.Hero[i][property],
            Trade: i + 1,
        });
    }

    return data;
}
