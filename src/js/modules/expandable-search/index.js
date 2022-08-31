import toggle from '@stormid/toggle';
const SELECTOR = '.js-expandable-search';

export const init = () => {
    if (document.querySelector(SELECTOR)) return toggle(SELECTOR);
};

init();