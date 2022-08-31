import tabs from '@stormid/tabs';
const SELECTOR = '.js-tabs';

export const init = () => {
    if (document.querySelector(SELECTOR)) return tabs(SELECTOR);
};

init();