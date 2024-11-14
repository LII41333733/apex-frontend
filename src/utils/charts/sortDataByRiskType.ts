import Trade from '@/types/Trade';

export default function (data: Trade[], count?: number) {
    if (!data.length) return [];

    const grouped = data.reduce(
        (acc: { [key: string]: Trade[] }, obj: Trade) => {
            if (!acc[obj.riskType]) acc[obj.riskType] = [];
            acc[obj.riskType].push(obj);
            return acc;
        },
        {}
    );

    const lowestLength =
        count ||
        Object.values(grouped).reduce((p, c, i) => {
            if (i === 0) {
                return c.length;
            } else {
                return Math.min(p, c.length);
            }
        }, 0);

    const result = {};
    for (const [key, value] of Object.entries(grouped)) {
        result[key] = value.slice(-lowestLength);
    }

    return result;
}
