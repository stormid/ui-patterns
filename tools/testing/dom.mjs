import { GlobalRegistrator } from '@happy-dom/global-registrator';

// Registers a happy-dom window/document (and the rest of the DOM API) onto
// Node's globals so tests can exercise DOM-dependent code — client-side modules
// from src/js/modules, or mounting Preact components with `preact`'s `render`.
//
// Opt-in: import this at the top of a test file that needs a DOM, e.g.
//   import '@testing/dom.mjs';
// Node runs each test file in its own process, so tests that don't import it
// stay DOM-free (e.g. the preact-render-to-string tests).
GlobalRegistrator.register();
