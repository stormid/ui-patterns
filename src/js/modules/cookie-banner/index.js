import cookieBanner from './lib';
import toggle from '@stormid/toggle';
import config from './config';
const SELECTOR = {
    TOGGLE: '.js-toggle-banner'
};

export const init = () => {
    let bannerToggle;
    document.addEventListener('banner.hide', _ => bannerToggle.startToggle()); // clean up className on root element if form in banner was open
    document.addEventListener('banner.show', _ => [ bannerToggle ] = toggle(SELECTOR.TOGGLE));

    const banner = cookieBanner(config);
    // const retriggerBtn = document.querySelector('.js-preferences-update');
    // if (retriggerBtn) retriggerBtn.addEventListener('click', e => banner.showBanner());
    [].slice.call(document.querySelectorAll('.js-preferences-update')).forEach(btn => btn.addEventListener('click', e => {
        banner.showBanner();
        bannerToggle.startToggle();
    }));

    return {
        banner,
        toggle: bannerToggle
    };
};

init();