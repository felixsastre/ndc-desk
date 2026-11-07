/** Low-level checks shared by every dialect. They only validate one token at a time. */
const IATA_CODE = /^[A-Za-z]{3}$/;
const DATE_TOKEN = /^(\d{1,2})([A-Za-z]{3})$/;
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function isIataCode(token = "") {
  return IATA_CODE.test(token);
}

/** Turns "12dec" into "12DEC". Returns null when the token is not a day and a month. */
export function parseDate(token = "") {
  const match = DATE_TOKEN.exec(token);
  if (!match) return null;

  const day = Number(match[1]);
  const month = match[2].toUpperCase();
  const isValid = MONTHS.includes(month) && day >= 1 && day <= 31;
  return isValid ? `${day}${month}` : null;
}
