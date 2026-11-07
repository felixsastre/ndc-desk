/**
 * Returns the missing end of the first completion that starts with what was typed.
 * Example: typed "A" with ["AN12DECMADLIM"] returns "N12DECMADLIM". Returns "" when nothing matches.
 */
export function suggestCompletion(typed, completions) {
  if (!typed) return "";

  const lowerTyped = typed.toLowerCase();
  const match = completions.find(
    (completion) => completion.length > typed.length && completion.toLowerCase().startsWith(lowerTyped),
  );
  return match ? match.slice(typed.length) : "";
}
