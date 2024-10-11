const getColor = (color: string) => {
  return `hsl(${getComputedStyle(document.documentElement)
    .getPropertyValue(`--${color}`)
    .trim()})`;
};

export const primary = () => getColor("primary");
