# ndc-desk

A desktop terminal for searching flights. You type short entries, like the ones travel agents have used for decades, and it answers with a table of offers and the conditions of each one.

It is a Tauri v2 app (Rust core) with a plain HTML, CSS and JavaScript interface. Today it shows generated demo offers; it does not connect to any airline or booking service.

## About this project

This is an experiment, made for research and out of curiosity about how airline distribution works. It is not prepared for production use, and it should not be used with real bookings, fares or traffic.

The project is unofficial and is not affiliated with Duffel or any airline.

## Words used here

- Offer: one option for a search, such as a flight with its price.
- Dialect: the style of entry you type. There are two: `amadeus` (short cryptic entries) and `plain` (English words).
- Entry: one line typed in the terminal.

## What it does

Search for a flight, look at the offers, pick one and see its conditions.

Amadeus dialect:

```
AN12DECMADLIM     offers for 12 December, Madrid to Lima
SS2M2             sell 2 seats in class M from line 2
FXP               price the sold itinerary
IG                ignore it
```

Plain dialect:

```
search MAD LIM 12DEC 2A
offers
open 2
```

Other commands: `help`, `dialect [name]` and `clear`. Tab accepts the grey suggestion, the arrow keys move through the history, and Ctrl+L clears the screen.

## Run it

You need [Node.js](https://nodejs.org/) and the [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) (Rust and the system libraries for your platform).

```
npm install
npm run dev        # run the desktop app
npm run build      # build a release bundle
```

The interface also works in a normal browser if you serve the `src/` folder. Add `?demo` to the address and it types a few entries by itself.

## What is in the repository

- `src/` is the interface. `js/` has one module per job, and `js/dialects/` has one module per entry style.
- `src-tauri/` is the Rust core.
- `CHANGELOG.md` lists the changes.

## License

[MIT](LICENSE)
