const getColor = (color: string) => {
    return `hsl(${getComputedStyle(document.documentElement)
        .getPropertyValue(`--${color}`)
        .trim()})`;
};

export const primary = () => getColor('apex-light-yellow');
export const mutedForeground = () => getColor('muted-foreground');
export const muted = () => getColor('muted');
export const background = () => getColor('background');
