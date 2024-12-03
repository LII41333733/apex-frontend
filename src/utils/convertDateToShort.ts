export default function (date: string) {
    return date
        .slice(5, 10)
        .split('-')
        .map((e) => (e[0] === '0' ? e.slice(1, e.length) : e))
        .join('/');
}
