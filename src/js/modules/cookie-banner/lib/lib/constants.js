/* istanbul ignore file */
export const ACCEPTED_TRIGGERS = ['button', 'a'];

export const FOCUSABLE_ELEMENTS = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'];

export const HOSTNAME = 'https://www.google-analytics.com';

export const MEASUREMENTS = {
    BANNER_DISPLAY: {
        ec: 'Banner',
        ea: 'Displays',
        cm1: 1
    },
    BANNER_ACCEPT: {
        ec: 'Save preferences',
        ea: 'Banner',
        cm2: 1,
        cm3: 1
    },
    BANNER_OPTIONS: {
        ec: 'Banner',
        ea: 'Clicks',
        el: 'Edit preferences',
        cm4: 1
    },
    FORM_DISPLAY: {
        ec: 'CookiePrefsWidget',
        ea: 'Displays',
        cm5: 1
    },
    SAVE_PREFERENCES: {
        ec: 'Save preferences',
        ea: 'CookiePrefs'
    }
};