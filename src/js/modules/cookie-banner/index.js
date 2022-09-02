import cookieBanner from './lib';
import toggle from '@stormid/toggle';
import config from './config';

export const init = () => {
    if (!document.querySelector('#js-cookie-banner-example')) return;
    let bannerToggle;
    document.addEventListener('banner.hide', _ => bannerToggle.startToggle()); // clean up className on root element if form in banner was open
    document.addEventListener('banner.show', _ => [ bannerToggle ] = toggle('.js-toggle-banner'));

    const banner = cookieBanner(config);
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