import { TABS } from '../../constants';
import tabs from '@stormid/tabs';

export default () => {
    if (!document.querySelector(TABS.SELECTOR)) return;
    return tabs(TABS.SELECTOR);
};