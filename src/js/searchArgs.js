import { isIataCode, parseDate } from "./tokens.js";

const PASSENGER_TOKEN = /^([1-9])A$/i;
const USAGE = "Usage: search <from> <to> <date> [pax], e.g. search MAD LIM 12DEC 2A";

/**
 * Turns the words after "search" into a search request (used by the plain-words dialect).
 * Returns { ok: true, value } or { ok: false, message }.
 */
export function parseSearchArgs(args) {
  const [origin, destination, dateToken, passengerToken = "1A"] = args;

  if (!isIataCode(origin) || !isIataCode(destination)) {
    return failure(`Airports must be 3-letter codes. ${USAGE}`);
  }

  const date = parseDate(dateToken);
  if (!date) return failure(`Invalid date. ${USAGE}`);

  const adults = parseAdults(passengerToken);
  if (!adults) return failure(`Invalid passengers. ${USAGE}`);

  return {
    ok: true,
    value: { origin: origin.toUpperCase(), destination: destination.toUpperCase(), date, adults },
  };
}

function parseAdults(token) {
  const match = PASSENGER_TOKEN.exec(token);
  return match ? Number(match[1]) : null;
}

function failure(message) {
  return { ok: false, message };
}
