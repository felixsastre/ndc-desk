const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

/** Types the given entries by itself, so the interface can be shown without anyone at the keyboard. */
export async function playDemo({ inputElement, submit, entries, keystrokeDelay = 55, pauseBetweenCommands = 1100 }) {
  for (const command of entries) {
    await typeInto(inputElement, command, keystrokeDelay);
    await wait(350);
    submit();
    await wait(pauseBetweenCommands);
  }
}

async function typeInto(inputElement, text, keystrokeDelay) {
  for (const character of text) {
    inputElement.value += character;
    inputElement.dispatchEvent(new Event("input"));
    await wait(keystrokeDelay);
  }
}
