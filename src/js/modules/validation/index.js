import { VALIDATION } from '../../constants';
import baseline from './baseline';
import describedby from './describedby';
import invalid from './invalid';

export default () => {
    if (!document.querySelector(VALIDATION.SELECTOR)) return;
    if (document.querySelector('.js-polite-invalid')) return invalid('.js-polite-invalid');
    if (document.querySelector('.js-aria-describedby')) return describedby('.js-aria-describedby');
    return baseline(VALIDATION.SELECTOR);
};