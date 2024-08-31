export default (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // getMonth() is zero-based
  const day = date.getDate();
  return `${month}/${day}`;
};
