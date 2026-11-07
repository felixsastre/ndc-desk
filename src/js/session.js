import { DEFAULT_DIALECT } from "./dialects/index.js";

/** Everything the terminal remembers between two entries. */
export function createSession() {
  return {
    dialect: DEFAULT_DIALECT,
    search: null,
    offers: [],
    selection: null,
  };
}
