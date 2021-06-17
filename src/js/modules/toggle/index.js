import { TOGGLE } from '../../constants';
import toggle from '@stormid/toggle';

export default () => {
    document.querySelector(TOGGLE.SELECTOR.OFF_CANVAS) && toggle(TOGGLE.SELECTOR.OFF_CANVAS, { focus: false, closeOnBlur: true });
    // document.querySelector(TOGGLE.SELECTOR.LOCAL) && toggle(TOGGLE.SELECTOR.LOCAL, TOGGLE.OPTIONS.LOCAL);
};