import { parseSearchArgs } from "../searchArgs.js";

/** Plain English words, for people who have never seen a booking terminal. */
const ENTRIES = {
  search: toSearchIntent,
  offers: () => ({ type: "listOffers" }),
  open: ([position]) => ({ type: "showOffer", position: Number(position) }),
};

function parse(rawInput) {
  const [name, ...args] = rawInput.trim().split(/\s+/);
  const key = name.toLowerCase();
  return Object.hasOwn(ENTRIES, key) ? ENTRIES[key](args) : null;
}

function toSearchIntent(args) {
  const parsed = parseSearchArgs(args);
  if (!parsed.ok) return { type: "invalid", message: parsed.message };
  return { type: "search", ...parsed.value };
}

export const plainDialect = {
  id: "plain",
  label: "Plain words",
  exampleEntry: "search MAD LIM 12DEC",
  nextStepHint: "Type open <n> to see baggage, change and refund conditions.",
  demoEntries: ["search MAD LIM 12DEC 2A", "open 2"],
  completions: ["search MAD LIM 12DEC 2A", "offers", "open 1"],
  help: [
    { usage: "search <from> <to> <date> [pax]", description: "Find offers, e.g. search MAD LIM 12DEC 2A" },
    { usage: "offers", description: "List the offers from the last search" },
    { usage: "open <n>", description: "Show the conditions of one offer" },
  ],
  parse,
};
