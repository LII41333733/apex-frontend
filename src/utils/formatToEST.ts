export function formatToEst(date: Date): string {
    // Convert date to EST timezone
    const estDate = new Date(
        date.toLocaleString('en-US', { timeZone: 'America/New_York' })
    );

    // Extract hours and minutes
    let hours = estDate.getHours();
    const minutes = estDate.getMinutes();
    const isPm = hours >= 12;

    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight

    // Format minutes to always be 2 digits
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Determine AM/PM
    const period = isPm ? 'pm' : 'am';

    // Combine into the desired format
    return `${hours}:${formattedMinutes}${period} EST`;
}
