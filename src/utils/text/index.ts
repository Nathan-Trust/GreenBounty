/**
 * Masks part of an email for privacy.
 * Example: "example@gmail.com" => "exa*****@gmail.com"
 *
 * @param {string | null | undefined} email - The email address to be masked, which can be null or undefined.
 * @returns {string} - The masked email address or a fallback message.
 */
export const maskEmail = (email: string | null | undefined): string => {
  // Return a fallback message if email is null, undefined, or an empty string
  if (!email) {
    return "Invalid email"; // You can customize this message
  }

  // Split the email into the local part (before @) and domain (after @)
  const [localPart, domain] = email.split("@");

  // If the email doesn't have a valid format, return the original email or an error message
  if (!localPart || !domain) return "Invalid email format"; // Customize message as needed

  // Mask the local part of the email if it's longer than 3 characters
  const maskedLocalPart =
    localPart.length > 3
      ? localPart.slice(0, 3) + "*****" // Show the first 3 characters, then mask the rest
      : localPart[0] + "*****"; // For short emails, show only the first character and mask the rest

  // Return the masked local part along with the unmodified domain
  return `${maskedLocalPart}@${domain}`;
};

export const truncateText = (str: string, n: number) =>
  str.length > n ? `${str.trim().substring(0, n)}...` : `${str.trim()}`;

export const capitalize = (s: string = "") =>
  s.length >= 1 ? s.charAt(0).toUpperCase() + s.slice(1) : "";

export const formatJoinedText = (
  str: string,
  separator: string | RegExp = "-"
) => {
  return str
    .split(separator)
    .map((word) => capitalize(word))
    .join(" ");
};

export const addSuffixes = (
  length: number,
  suffixes: string = "s",
  alt?: string
) => (length > 1 ? suffixes : alt ?? "");

export interface QueryTextProps {
  isEdit?: boolean;
  isDelete?: boolean;
}

export const successText = ({ isDelete, isEdit }: QueryTextProps) =>
  `${isDelete ? "deleted" : isEdit ? "edited" : "created"} successfully`;

export const errorText = ({ isDelete, isEdit }: QueryTextProps) =>
  `Failed to ${isDelete ? "delete" : isEdit ? "edit" : "create new"}`;

export const joinFirstNameAndLastName = (
  first_name?: string | null,
  last_name?: string | null
) => `${returnPlaceHolderTxt(first_name)} ${returnPlaceHolderTxt(last_name)}`;

export const returnPlaceHolderTxt = (
  text?: string | number | null,
  placeholder?: string
) => text ?? placeholder ?? "-";

export const getArticle = (role: string | null) => {
  if (!role) return "";
  const vowelRegex = /^[aeiou]/i;
  return vowelRegex.test(role) ? "an" : "a";
};

export function camelCaseToSentenceCase(key: string) {
  return key
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}

/**
 * Get initials from a person's first and last name.
 * @param firstName - The first name of the person.
 * @param lastName - The last name of the person.
 * @returns A string containing the initials (first letter of first and last name).
 */
export const getInitials = (firstName: string, lastName: string): string => {
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

/**
 * Get full name from a person's first and last name.
 * @param firstName - The first name of the person.
 * @param lastName - The last name of the person.
 * @returns A string containing the full name (formatted as "First Last").
 */
export const formatFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};
