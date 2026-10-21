import autocomplete from '@stormid/autocomplete';
const SELECTOR = '.js-autocomplete';

export const init = () => {
    // Options are enhanced from a <select>: show and search the option text, submit the option value
    if (document.querySelector(SELECTOR)) return autocomplete(SELECTOR, { displayTemplate: option => option.label });
};

init();
