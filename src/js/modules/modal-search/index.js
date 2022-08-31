import modal from '@stormid/modal';
const SELECTOR = '.js-modal-search';

export const init = () => {
    if (document.querySelector(SELECTOR)) return modal(SELECTOR);
};

init();