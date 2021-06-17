import * as CONSTANTS from '../../constants';
const constantise = str => str.split('-').join('_').toUpperCase();

export default component => fn => {
    const { SELECTOR, MODULE = false, OPTIONS = {} } = CONSTANTS[constantise(component)];
    const targetNode = typeof SELECTOR === 'string'
        ? document.querySelector(SELECTOR)
        : Object.keys(SELECTOR).reduce((acc, curr) => acc || (!!document.querySelector(SELECTOR[curr])), false);
    if (!targetNode) return;
    if (MODULE) fn.then(module => module.default(SELECTOR, OPTIONS));
    else import(/* webpackChunkName: "[request]" */`../${component}`).then(module => module.default(SELECTOR, OPTIONS));
};