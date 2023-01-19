import toggle from '@stormid/toggle';
const SELECTOR = {
    SEARCH: '.js-exclusive-search',
    NAV: '.js-exclusive-nav',
};

export const init = () => {
    const navNode = document.querySelector(SELECTOR.NAV, { focus: false });
    const searchNode = document.querySelector(SELECTOR.SEARCH);
    if (navNode && searchNode) {
        const [ nav ] = toggle(navNode);
        const [ search ] = toggle(searchNode);

        navNode.addEventListener('toggle.open', e => {
            if (search.getState().isOpen) search.startToggle();
        });
        searchNode.addEventListener('toggle.open', e => {
            if (nav.getState().isOpen) nav.startToggle();
        });
        
        return { nav, search };
    };
};

init();