/** Formats a sold segment like a booking terminal does: line, flight, class, date, route, status, times. */
export function formatItineraryLine({ offer, search, seats }) {
  const route = `${search.origin}${search.destination}`;
  const times = `${compactTime(offer.departure)} ${compactTime(offer.arrival)}`;
  return `1  ${offer.flightNumber} ${offer.bookingClass} ${search.date.padEnd(5)} ${route} HK${seats}  ${times}`;
}

function compactTime(time) {
  return time.replace(":", "");
}
