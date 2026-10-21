# UI Patterns

A catalogue of accessible, design agnostic best practice user interface patterns.

Built on the [Storm ID Scaffold](https://github.com/stormid/scaffold) (Rspack, SWC, Preact).

## Development

Requires Node.js 24 (see `.nvmrc`).

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `npm i`             | install dependencies                          |
| `npm start`         | alias for npm run dev                         |
| `npm run dev`       | start dev server with live reloading          |
| `npm run build`     | write static site to disk                     |
| `npm run ci`        | write static assets to disk for production/CI |
| `npm run watch`     | watch and write assets to disk for production |
| `npm t`             | run unit and end-to-end tests                 |
| `npm run test:e2e`  | run Playwright end-to-end and axe tests       |
| `npm run test:unit` | run unit tests with the Node.js test runner   |
| `npm run lint`      | lint with oxlint                              |
| `npm run lint:fix`  | lint and auto-fix with oxlint                 |
