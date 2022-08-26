import { cookiesEnabled, extractFromCookie, noop } from './utils';
import { showBanner, initBanner, initForm, initBannerListeners } from './ui';
import { necessary, apply } from './consent';
import { createStore } from './store';
import { initialState } from './reducers';
import { composeParams } from './measurement';

export default settings => {
    /* istanbul ignore next */
    if (!cookiesEnabled()) return;
    const Store = createStore();

    if (!settings.tid) console.warn('The tid setting is missing. A tid is required for banner measurements.');
    
    //extractFromCookie adds a try/catch guard for cookie reading and JSON.parse in case of cookie name collisions caused by versioning
    //for sites that are saving the cookie consent in a different shape, i.e. without cid and consent properties
    //and for sites with cookies that are not base64 encoded
    const [ hasCookie, cid, consent ] = extractFromCookie(settings);
    
    Store.update(
        initialState,
        {
            settings,
            bannerOpen: false,
            persistentMeasurementParams: settings.tid ? composeParams(cid, settings.tid) : false,
            consent
        },
        [
            necessary,
            apply(Store),
            hasCookie ? noop : initBanner(Store),
            initForm(Store),
            initBannerListeners(Store)
        ]
    );

    return {
        getState: Store.getState,
        showBanner(cb) {
            showBanner(Store)(cb);
            initBannerListeners(Store)();
        },
        renderForm: initForm(Store)
    };
};