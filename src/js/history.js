/** Remembers submitted commands so the arrow keys can walk back through them. */
export function createHistory() {
  const entries = [];
  let cursor = 0;

  function push(entry) {
    const isNew = entry && entries.at(-1) !== entry;
    if (isNew) entries.push(entry);
    cursor = entries.length;
  }

  function previous() {
    cursor = Math.max(0, cursor - 1);
    return entries[cursor] ?? "";
  }

  function next() {
    cursor = Math.min(entries.length, cursor + 1);
    return entries[cursor] ?? "";
  }

  return { push, previous, next };
}
