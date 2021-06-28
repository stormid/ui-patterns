import { TOGGLE } from '../../constants';
import toggle from '@stormid/toggle';

export default () => {
    if (document.querySelector(TOGGLE.SELECTOR.EXCLUSIVE_NAV)) {
        return toggle(TOGGLE.SELECTOR.EXCLUSIVE_NAV, { closeOnBlur: true });
    }
    if (document.querySelector(TOGGLE.SELECTOR.EXCLUSIVE_SEARCH)) {
        return toggle(TOGGLE.SELECTOR.EXCLUSIVE_SEARCH, { focus: false, closeOnBlur: true });
    }
};