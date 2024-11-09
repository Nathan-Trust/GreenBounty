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
