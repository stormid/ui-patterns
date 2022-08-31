import { TOGGLE } from '../../constants';
import toggle from '@stormid/toggle';

export default () => {
    const navNode = document.querySelector(TOGGLE.SELECTOR.EXCLUSIVE_NAV);
    const searchNode = document.querySelector(TOGGLE.SELECTOR.EXCLUSIVE_SEARCH);
    if (!navNode || !searchNode) return;
    
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