import { VALIDATION } from '../../constants';
import validate from './lib';

export default () => {
    if (!document.querySelector(VALIDATION.SELECTOR)) return;
    validate(VALIDATION.SELECTOR);
};