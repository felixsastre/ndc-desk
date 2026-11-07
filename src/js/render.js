import { formatPrice } from "./money.js";

/** Builds the DOM nodes the terminal prints. Pure: returns nodes, never touches the page. */

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

export function textLine(text, tone = "plain") {
  return createElement("p", `line line--${tone}`, text);
}

export function echoLine(input) {
  const line = createElement("p", "line line--echo");
  line.append(createElement("span", "line__prompt", "$"), createElement("span", "", input));
  return line;
}

export function welcomeBanner(dialect) {
  const banner = createElement("section", "welcome");
  banner.append(
    createElement("p", "welcome__title", "ndc-desk v0.1.0"),
    createElement("p", "welcome__meta", `Demo data · ${dialect.label} entries`),
    createElement("p", "welcome__hint", `Type help, or try ${dialect.exampleEntry}.`),
  );
  return banner;
}

export function helpBlock(entries) {
  const block = createElement("section", "help");
  for (const { usage, description } of entries) {
    const row = createElement("div", "help__row");
    row.append(createElement("code", "help__usage", usage), createElement("span", "help__description", description));
    block.append(row);
  }
  return block;
}

const OFFER_HEADERS = ["#", "Flight", "Cls", "Fare", "Times", "Duration", "Stops", "Price"];

export function offersTable(offers) {
  const table = createElement("section", "offers");
  table.append(tableRow(OFFER_HEADERS, "offers__row offers__row--head"));
  offers.forEach((offer, index) => table.append(tableRow(offerCells(offer, index + 1), "offers__row")));
  return table;
}

export function offerDetail(offer, position, seats = 1) {
  const detail = createElement("section", "detail");
  const rows = [
    ["Offer", `#${position} · ${offer.id}`],
    ["Flight", `${offer.flightNumber} · class ${offer.bookingClass}`],
    ["Route", offer.route],
    ["Fare", offer.fareBrand],
    ["Baggage", offer.baggage],
    ["Changes", offer.change],
    ["Refund", offer.refund],
    [`Total (${seats} pax)`, formatPrice(offer.priceCents * seats)],
  ];
  for (const [label, value] of rows) {
    const row = createElement("div", "detail__row");
    row.append(createElement("span", "detail__label", label), createElement("span", "", value));
    detail.append(row);
  }
  return detail;
}

function offerCells(offer, position) {
  return [position, offer.flightNumber, offer.bookingClass, offer.fareBrand, offer.times, offer.duration, offer.stops, offer.price];
}

function tableRow(cells, className) {
  const row = createElement("div", className);
  for (const cell of cells) row.append(createElement("span", "", String(cell)));
  return row;
}
