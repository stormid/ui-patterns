import toggle from '@stormid/toggle';
import { TOGGLE } from '../../constants';

export default () => {
    if (document.querySelector(TOGGLE.SELECTOR.FULL_SCREEN_NAVIGATION)) {
        return toggle(TOGGLE.SELECTOR.FULL_SCREEN_NAVIGATION, { focus: false });
    }
};