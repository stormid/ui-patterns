import toggle from '@stormid/toggle';
const SELECTOR = '.js-expandable-nav';

export const init = () => {
    if (document.querySelector(SELECTOR)) return toggle(SELECTOR, { focus: false });
};

init();