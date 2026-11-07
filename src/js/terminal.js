/** Owns the scrolling output area: appending nodes, clearing, keeping the latest line in view. */
export function createTerminal(outputElement) {
  function print(...nodes) {
    outputElement.append(...nodes);
    // "instant" so the newest line is never left half hidden by a running smooth scroll.
    outputElement.scrollTo({ top: outputElement.scrollHeight, behavior: "instant" });
  }

  function clear() {
    outputElement.replaceChildren();
  }

  return { print, clear };
}
