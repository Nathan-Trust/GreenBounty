/**
 * Converts the number of coins to the equivalent amount in Naira (NGN).
 * @param {number} coins - The number of coins to convert.
 * @param {number} rate - The conversion rate (e.g., 1 coin = 10 Naira).
 * @returns {string} - The equivalent amount in Naira (NGN), formatted with the ₦ symbol.
 */
export const convertCoinsToNGNCurrency = (
  coins: number,
  rate: number = 10
): string => {
  const amountInNGN = coins * rate;
  return `₦${amountInNGN.toLocaleString()}`;
};
