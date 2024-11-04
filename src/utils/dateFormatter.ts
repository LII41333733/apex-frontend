export default (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.getUTCMonth() + 1; // getUTCMonth() is zero-based, so we add 1
    const day = date.getUTCDate();
    return `${month}/${day}`;
};
