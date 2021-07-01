import { TOGGLE } from '../../constants';
import toggle from '@stormid/toggle';

export default () => {
    if (!document.querySelector(TOGGLE.SELECTOR.EXCLUSIVE_NAV)) return;
    
    const nav = toggle(TOGGLE.SELECTOR.EXCLUSIVE_NAV, { focus: false, closeOnBlur: true });
    const search = toggle(TOGGLE.SELECTOR.EXCLUSIVE_SEARCH, { closeOnBlur: true });
    
    return { nav, search }; 
};