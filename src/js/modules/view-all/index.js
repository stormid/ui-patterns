import toggle from '@stormid/toggle';
const SELECTORS = {
    NODE: '.js-expandable-section',
    TOGGLES: '.js-expandable-section-all',
    BTN: '.js-expandable-section-all',
}

export const init = () => {

    


    if (document.querySelector(SELECTOR)) return toggle(SELECTOR, { focus: false, local: true });
};

init();