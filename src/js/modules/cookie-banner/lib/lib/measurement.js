import { HOSTNAME } from './constants';

export const composeParams = (cid, tid) => ({
    tid,
    v:	1,
    t: 'event',
    ds:	'cookiebanner',
    dh: location.hostname,
    uip: '0.0.0.0',
    sr: window.screen ? `${window.screen.width}x${window.screen.height}`: null,
    vp: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
    cid,
    cd1: cid,
    cd3: location.hostname,
    cd4: 'consentAPI'
});

export const composeMeasurementConsent = consent => Object.keys(consent).filter(key => consent[key]).join(',');

export const cacheBuster = () => {
    try {
        const n = new Uint32Array(1);
        window.crypto.getRandomValues(n);
        return n[0] & 2147483647;
    } catch (err) {
        return Math.round(2147483647 * Math.random());
    }
};

export const request = url => {
    if (navigator.sendBeacon) {
        navigator.sendBeacon(url);
        return;
    }
    const img = document.createElement('img');
    img.width = 1;
    img.height = 1;
    img.src = url;
    return img;
};

export const composeDataToURL = data => Object.keys(data).reduce((acc, param) => {
    if (data[param] !== null) acc.push(`${param}=${encodeURIComponent(data[param])}`);
    return acc;
}, []).join('&');

export const dataToURL = (data, urlAction) => `${HOSTNAME}/${urlAction}?${composeDataToURL(data)}`;

export const measure = (state, measurements, urlAction = 'collect') => request(dataToURL({
    ...state.persistentMeasurementParams,
    ...measurements,
    ...(state.settings.debug ? {} : { z: cacheBuster() })
}, urlAction));