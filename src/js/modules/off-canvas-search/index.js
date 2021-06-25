import { TOGGLE } from '../../constants';
import toggle from '@stormid/toggle';

export default () => {
    if (document.querySelector(TOGGLE.SELECTOR.OFF_CANVAS_SEARCH)) {
        return toggle(TOGGLE.SELECTOR.OFF_CANVAS_SEARCH, { closeOnBlur: true });
    }
};