import { register } from 'node:module';

// Registers the SWC loader so `node --test` can import JSX source/test files
// and resolve the build's path aliases.
register('./loader.mjs', import.meta.url);
