// A CommonJS module with no `__esModule` marker. Nothing should unwrap it:
// `import x from` must still hand over the whole `module.exports`, exactly as
// Node does without the loader.
module.exports = {
    named: () => 'named export'
};
