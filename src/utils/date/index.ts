/**
 * Formats a given date string into the format "2nd August, 2023".
 *
 * @param {string | null | undefined} dateStr - The ISO date string to format (e.g., "2024-09-25T13:29:31.296839").
 * @returns {string} - The formatted date string in the format "2nd August, 2023" or an error message if invalid.
 */
export function formatDate(dateStr: string | null | undefined): string {
  // Check if dateStr is null, undefined, or an invalid date
  if (!dateStr) {
    return "Invalid date"; // Return a default message for invalid input
  }

  const date = new Date(dateStr);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date"; // Return a default message for an invalid date
  }

  // Extract the day, month, and year from the date
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Helper function to get the ordinal suffix for a given day (e.g., "st", "nd", "rd", "th")
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th"; // Handles 11th, 12th, 13th, etc.
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Construct the formatted date string
  const formattedDay = `${day}${getOrdinalSuffix(day)}`;
  return `${formattedDay} ${month}, ${year}`;
}
