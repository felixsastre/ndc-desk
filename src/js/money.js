const CURRENCY = "EUR";

/** Prices are kept as whole cents so arithmetic never produces rounding noise. */
export function formatPrice(cents) {
  return `${CURRENCY} ${(cents / 100).toFixed(2)}`;
}
