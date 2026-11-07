import { completionsFor, runInput } from "./commands.js";
import { playDemo } from "./demo.js";
import { createHistory } from "./history.js";
import { echoLine, welcomeBanner } from "./render.js";
import { createSession } from "./session.js";
import { suggestCompletion } from "./suggest.js";
import { createTerminal } from "./terminal.js";

const outputElement = document.querySelector("#output");
const inputElement = document.querySelector("#input");
const ghostElement = document.querySelector("#ghost");
const dialectBadge = document.querySelector("#dialect-badge");

const terminal = createTerminal(outputElement);
const history = createHistory();
const session = createSession();

function submit() {
  const rawInput = inputElement.value.trim();
  setInput("");
  if (!rawInput) return;

  history.push(rawInput);
  terminal.print(echoLine(rawInput));

  const result = runInput(rawInput, session);
  if (result.clear) terminal.clear();
  terminal.print(...result.nodes);
  showDialect();
}

function setInput(value) {
  inputElement.value = value;
  updateGhost();
}

function currentSuggestion() {
  return suggestCompletion(inputElement.value, completionsFor(session));
}

function acceptSuggestion() {
  setInput(inputElement.value + currentSuggestion());
}

// The ghost text shows the rest of an entry in grey, right behind the typed characters.
function updateGhost() {
  const typedText = document.createElement("span");
  typedText.className = "ghost__typed";
  typedText.textContent = inputElement.value;

  ghostElement.replaceChildren(typedText, currentSuggestion());
}

function showDialect() {
  dialectBadge.textContent = session.dialect.label;
}

const KEY_ACTIONS = {
  Enter: submit,
  Tab: acceptSuggestion,
  Escape: () => setInput(""),
  ArrowUp: () => setInput(history.previous()),
  ArrowDown: () => setInput(history.next()),
};

function findKeyAction(event) {
  const isClearShortcut = event.ctrlKey && event.key.toLowerCase() === "l";
  return isClearShortcut ? () => terminal.clear() : KEY_ACTIONS[event.key];
}

inputElement.addEventListener("keydown", (event) => {
  const action = findKeyAction(event);
  if (!action) return;

  event.preventDefault();
  action();
});

inputElement.addEventListener("input", updateGhost);
document.addEventListener("click", () => inputElement.focus());

// Outside the desktop app (plain browser preview) the window buttons are drawn by CSS.
const isDesktopApp = "__TAURI_INTERNALS__" in window;
if (!isDesktopApp) document.body.classList.add("is-browser");

terminal.print(welcomeBanner(session.dialect));
showDialect();
updateGhost();

if (new URLSearchParams(location.search).has("demo")) {
  playDemo({ inputElement, submit, entries: session.dialect.demoEntries });
}
