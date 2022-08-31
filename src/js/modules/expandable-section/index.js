import toggle from '@stormid/toggle';
const SELECTOR = '.js-expandable-section';

export const init = () => {
    if (document.querySelector(SELECTOR)) return toggle(SELECTOR, { focus: false, local: true });
};

init();