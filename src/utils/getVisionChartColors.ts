export default (numColors: number) =>
    Array.from({ length: numColors }, (_, i) => {
        const hue = (i / (numColors - 1)) * 360;
        return `hsl(${hue}, 100%, 50%)`;
    });
