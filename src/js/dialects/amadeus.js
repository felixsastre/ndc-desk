import { parseDate } from "../tokens.js";

/**
 * Amadeus-style cryptic entries. Real entries have no spaces, so spaces are ignored.
 *   AN12DECMADLIM  availability for 12 December, Madrid to Lima
 *   SS2M2          sell 2 seats in class M from line 2 of the last availability
 *   FXP            price the sold itinerary
 *   IG             ignore (drop) the sold itinerary
 */
const ENTRIES = [
  { prefix: "AN", example: "AN12DECMADLIM", pattern: /^AN(\d{1,2}[A-Z]{3})([A-Z]{3})([A-Z]{3})$/, toIntent: toSearchIntent },
  { prefix: "SS", example: "SS2M2", pattern: /^SS([1-9])([A-Z])(\d{1,2})$/, toIntent: toSelectIntent },
  { prefix: "FXP", example: "FXP", pattern: /^FXP$/, toIntent: () => ({ type: "price" }) },
  { prefix: "IG", example: "IG", pattern: /^IG$/, toIntent: () => ({ type: "ignore" }) },
];

function parse(rawInput) {
  const entry = rawInput.replace(/\s+/g, "").toUpperCase();
  const definition = ENTRIES.find(({ prefix }) => entry.startsWith(prefix));
  if (!definition) return null;

  const match = definition.pattern.exec(entry);
  if (!match) return invalid(`Invalid format. Example: ${definition.example}`);
  return definition.toIntent(match);
}

function toSearchIntent([, dateToken, origin, destination]) {
  const date = parseDate(dateToken);
  if (!date) return invalid("Invalid date. Example: AN12DECMADLIM");
  return { type: "search", origin, destination, date, adults: 1 };
}

function toSelectIntent([, seats, bookingClass, line]) {
  return { type: "select", seats: Number(seats), bookingClass, position: Number(line) };
}

function invalid(message) {
  return { type: "invalid", message };
}

export const amadeusDialect = {
  id: "amadeus",
  label: "Amadeus",
  exampleEntry: "AN12DECMADLIM",
  nextStepHint: "Sell a line with SS<seats><class><line>, e.g. SS2M2.",
  demoEntries: ["AN12DECMADLIM", "SS2M2", "FXP"],
  completions: ENTRIES.map(({ example }) => example),
  help: [
    { usage: "AN<date><from><to>", description: "Availability, e.g. AN12DECMADLIM" },
    { usage: "SS<seats><class><line>", description: "Sell a line from the last availability, e.g. SS2M2" },
    { usage: "FXP", description: "Price the sold itinerary and show its conditions" },
    { usage: "IG", description: "Ignore the sold itinerary" },
  ],
  parse,
};
