export function dateFormatFull(dateString: string) {
  const date = new Date(dateString);

  // Extract components
  const month = date.getUTCMonth() + 1; // getUTCMonth() returns 0-11, so add 1
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  // Get hours and convert to 12-hour format
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to always have two digits
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Return the formatted date string
  return `${month}/${day}/${year} ${hours}:${formattedMinutes} ${ampm}`;
}
