import { VALIDATION } from '../../constants';
import validate from '@stormid/validate';

export default () => {
    if (!document.querySelector(VALIDATION.SELECTOR)) return;
    validate(VALIDATION.SELECTOR);
};