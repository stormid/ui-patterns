import { TOGGLE } from '../../constants';
import toggle from '@stormid/toggle';

export default () => {
    if (document.querySelector(TOGGLE.SELECTOR.EXPANDABLE_NAV)) {
        return toggle(TOGGLE.SELECTOR.EXPANDABLE_NAV, { focus: false});
    }
};