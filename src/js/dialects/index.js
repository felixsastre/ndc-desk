import { amadeusDialect } from "./amadeus.js";
import { plainDialect } from "./plain.js";

/**
 * A dialect turns what the agent types into an intent such as { type: "search", ... }.
 * To add Sabre or KIU, write one module with the same shape and list it here.
 */
export const DIALECTS = [amadeusDialect, plainDialect];
export const DEFAULT_DIALECT = amadeusDialect;

export function findDialect(id) {
  return DIALECTS.find((dialect) => dialect.id === id);
}
