import { DIALECTS, findDialect } from "./dialects/index.js";
import { formatItineraryLine } from "./itinerary.js";
import { buildMockOffers } from "./mockOffers.js";
import { helpBlock, offerDetail, offersTable, textLine } from "./render.js";
import { parseTerminalCommand, TERMINAL_COMPLETIONS, TERMINAL_HELP } from "./terminalCommands.js";

/**
 * Turns an entry into an intent (terminal commands first, then the active dialect)
 * and runs it. Handlers return { nodes, clear? }: what to show, never where to print it.
 */
const HANDLERS = {
  help: runHelp,
  clear: runClear,
  dialect: runDialect,
  search: runSearch,
  listOffers: runListOffers,
  showOffer: runShowOffer,
  select: runSelect,
  price: runPrice,
  ignore: runIgnore,
  invalid: ({ message }) => showError(message),
};

const NO_OFFERS_MESSAGE = "No offers yet. Search first.";

export function runInput(rawInput, session) {
  const intent = parseTerminalCommand(rawInput) ?? session.dialect.parse(rawInput);
  if (!intent) return showError(`Unknown entry. Type help to see the ${session.dialect.label} entries.`);
  return HANDLERS[intent.type](intent, session);
}

export function completionsFor(session) {
  return [...session.dialect.completions, ...TERMINAL_COMPLETIONS];
}

function runHelp(_intent, session) {
  return { nodes: [helpBlock([...session.dialect.help, ...TERMINAL_HELP])] };
}

function runClear() {
  return { nodes: [], clear: true };
}

function runDialect({ id }, session) {
  const availableIds = DIALECTS.map((dialect) => dialect.id).join(", ");
  if (!id) return { nodes: [textLine(`Current dialect: ${session.dialect.id}. Available: ${availableIds}.`, "muted")] };

  const dialect = findDialect(id.toLowerCase());
  if (!dialect) return showError(`Unknown dialect "${id}". Available: ${availableIds}.`);

  session.dialect = dialect;
  return { nodes: [textLine(`Dialect set to ${dialect.label}. Try ${dialect.exampleEntry}.`, "success")] };
}

function runSearch({ origin, destination, date, adults }, session) {
  session.search = { origin, destination, date, adults };
  session.offers = buildMockOffers({ origin, destination });
  session.selection = null;

  return {
    nodes: [
      textLine(`${origin} → ${destination} · ${date} · ${session.offers.length} offers`, "success"),
      offersTable(session.offers),
      textLine(session.dialect.nextStepHint, "muted"),
    ],
  };
}

function runListOffers(_intent, session) {
  if (session.offers.length === 0) return showError(NO_OFFERS_MESSAGE);
  return { nodes: [offersTable(session.offers)] };
}

function runShowOffer({ position }, session) {
  if (session.offers.length === 0) return showError(NO_OFFERS_MESSAGE);

  const offer = session.offers[position - 1];
  if (!offer) return showError(`Pick a number between 1 and ${session.offers.length}.`);
  return { nodes: [offerDetail(offer, position)] };
}

function runSelect({ seats, bookingClass, position }, session) {
  if (session.offers.length === 0) return showError(NO_OFFERS_MESSAGE);

  const offer = session.offers[position - 1];
  if (!offer) return showError(`There is no line ${position}. Pick 1 to ${session.offers.length}.`);
  if (offer.bookingClass !== bookingClass) {
    return showError(`Line ${position} is class ${offer.bookingClass}, not ${bookingClass}.`);
  }

  session.selection = { offer, seats };
  return {
    nodes: [
      textLine(formatItineraryLine({ offer, search: session.search, seats })),
      textLine("Type FXP to price it.", "muted"),
    ],
  };
}

function runPrice(_intent, session) {
  if (!session.selection) return showError("Nothing to price. Sell a line first.");

  const { offer, seats } = session.selection;
  const position = session.offers.indexOf(offer) + 1;
  return { nodes: [offerDetail(offer, position, seats)] };
}

function runIgnore(_intent, session) {
  session.selection = null;
  return { nodes: [textLine("IGNORED", "muted")] };
}

function showError(message) {
  return { nodes: [textLine(message, "error")] };
}
