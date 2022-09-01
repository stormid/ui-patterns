import cookieBanner from '@stormid/cookie-banner';
import toggle from '@stormid/toggle';
import config from './config';
const SELECTOR = {
    TOGGLE: '.js-toggle-banner'
};

export const init = () => {
    const banner = cookieBanner(config);
    const retriggerBtn = document.querySelector('.js-preferences-update');
    let toggles = document.querySelector(SELECTOR.TOGGLE) ? toggle(SELECTOR.TOGGLE) : [];
    document.addEventListener('banner.hide', e => toggles[0].startToggle()); // clean up className on root element if form in banner was open
    document.addEventListener('banner.show', e => toggles = toggle(SELECTOR.TOGGLE));
    if (retriggerBtn) retriggerBtn.addEventListener('click', e => banner.showBanner());

    return {
        banner,
        toggles
    };
};

init();