/**
 * Masks the middle digits of an account number, displaying only the first two and last three digits.
 *
 * @param {string} accountNumber - The full account number to be masked.
 * @returns {string} - The masked account number in the format "12 *** *** 678".
 *
 * @example
 * // Returns "12 *** *** 678" for an account number "123456789".
 * maskAccountNumber("123456789");
 *
 * @example
 * // Returns "1234" for short account numbers.
 * maskAccountNumber("1234");
 */
export const maskAccountNumber = (accountNumber: string) => {
  if (accountNumber.length < 5) return accountNumber; // handle short account numbers
  return `${accountNumber.slice(0, 2)} *** *** ${accountNumber.slice(-3)}`;
};


export const formatAccountNumber = (accountNumber: string) => {
  if (!accountNumber) return "";

  // Pad the number with leading zeros to ensure it's 11 digits
  const paddedNumber = accountNumber.padStart(11, "0");

  // Format as `XXX XXXX XXXX`
  return paddedNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
};
