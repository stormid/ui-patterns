import { VALIDATION } from '../../constants';
import describedby from './describedby';
import nosummary from './no-summary';
import shortsummary from './short-summary';

export default () => {
    if (!document.querySelector(VALIDATION.SELECTOR)) return;
    if (document.querySelector('.js-no-summary')) return nosummary('.js-no-summary');
    if (document.querySelector('.js-aria-describedby')) return describedby('.js-aria-describedby');
    if (document.querySelector('.js-short-summary')) return shortsummary('.js-short-summary');
};