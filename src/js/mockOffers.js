import { formatPrice } from "./money.js";

/**
 * Fake offers for the interface demo. They are shaped like what a real search will return,
 * so the screens do not change when the Duffel client replaces this module.
 */
const OFFER_TEMPLATES = [
  { flightNumber: "ZZ1001", bookingClass: "N", fareBrand: "Basic", departure: "06:45", arrival: "09:10", duration: "2h 25m", stops: "Direct", priceCents: 9450, baggage: "Cabin bag only", change: "Not allowed", refund: "Not allowed" },
  { flightNumber: "ZZ1003", bookingClass: "M", fareBrand: "Standard", departure: "09:30", arrival: "11:55", duration: "2h 25m", stops: "Direct", priceCents: 12800, baggage: "Cabin bag + 1 checked (23 kg)", change: "EUR 60 fee", refund: "Not allowed" },
  { flightNumber: "ZZ1003", bookingClass: "Y", fareBrand: "Flex", departure: "09:30", arrival: "11:55", duration: "2h 25m", stops: "Direct", priceCents: 18990, baggage: "Cabin bag + 1 checked (23 kg)", change: "Free", refund: "EUR 40 fee" },
  { flightNumber: "ZZ2210", bookingClass: "M", fareBrand: "Standard", departure: "13:15", arrival: "17:40", duration: "4h 25m", stops: "1 stop", priceCents: 11230, baggage: "Cabin bag + 1 checked (23 kg)", change: "EUR 60 fee", refund: "Not allowed" },
  { flightNumber: "ZZ1007", bookingClass: "J", fareBrand: "Flex Plus", departure: "18:05", arrival: "20:30", duration: "2h 25m", stops: "Direct", priceCents: 24100, baggage: "Cabin bag + 2 checked (23 kg)", change: "Free", refund: "Free" },
];

export function buildMockOffers({ origin, destination }) {
  return OFFER_TEMPLATES.map((template, index) => ({
    id: `off_demo_${index + 1}`,
    route: `${origin} → ${destination}`,
    times: `${template.departure} → ${template.arrival}`,
    price: formatPrice(template.priceCents),
    ...template,
  }));
}
