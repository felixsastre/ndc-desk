/** Commands that belong to the terminal itself, so they work in every dialect. */
const ENTRIES = {
  help: () => ({ type: "help" }),
  clear: () => ({ type: "clear" }),
  dialect: ([id]) => ({ type: "dialect", id }),
};

export const TERMINAL_HELP = [
  { usage: "help", description: "Show the entries of the current dialect" },
  { usage: "dialect [name]", description: "Show or change the dialect (amadeus, plain)" },
  { usage: "clear", description: "Clear the screen" },
];

export const TERMINAL_COMPLETIONS = ["help", "clear", "dialect amadeus", "dialect plain"];

export function parseTerminalCommand(rawInput) {
  const [name, ...args] = rawInput.trim().split(/\s+/);
  const key = name.toLowerCase();
  return Object.hasOwn(ENTRIES, key) ? ENTRIES[key](args) : null;
}
