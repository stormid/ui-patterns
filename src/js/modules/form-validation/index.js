import validate from '@stormid/validate';
const SELECTOR = 'form:not([novalidate])';

export const init = () => {
    if (document.querySelector(SELECTOR)) return validate(SELECTOR);
};

init();