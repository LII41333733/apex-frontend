import Trade from '@/types/Trade';

export default function (data: { [key: string]: Trade[] }, property: string) {
    const list = [];

    const riskTypes = Object.keys(data);

    if (!riskTypes.length) return list;

    const length = data[riskTypes[0]].length;

    for (let i = 0; i < length - 1; i++) {
        const obj = {};
        for (let j = 0; j < riskTypes.length; j++) {
            const riskType = riskTypes[j];
            const item = data[riskType][i];
            obj[riskType] = item[property];
        }
        obj.closeDate = new Date(data[riskTypes[0]][i].closeDate)
            .toISOString()
            .split('T')[0];

        list.push(obj);
    }

    console.log(list);
    return list;
}
