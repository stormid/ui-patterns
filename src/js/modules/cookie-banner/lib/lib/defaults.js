/* istanbul ignore file */
import { removeSubdomain } from './utils';

export default {
    name: '.CookiePreferences',
    path: '/',
    domain: window.location.hostname === 'localhost' ? '' : `.${removeSubdomain(window.location.hostname)}`,
    secure: true,
    samesite: 'strict',
    expiry: 365,
    types: {},
    necessary: [],
    policyURL: '/cookie-policy/#preferences',
    classNames: {
        banner: 'privacy-banner',
        acceptBtn: 'privacy-banner__accept',
        submitBtn: 'privacy-banner__submit',
        optionsBtn: 'privacy-banner__options',
        field: 'privacy-banner__field',
        form: 'privacy-banner__form',
        fieldset: 'privacy-banner__fieldset',
        legend: 'privacy-banner__legend',
        formContainer: 'privacy-banner__form-container',
        formMessage: 'privacy-banner__form-msg',
        title: 'privacy-banner__form-title',
        description: 'privacy-banner__form-description'
    },
    hideBannerOnFormPage: true,
    savedMessage: 'Your settings have been saved.',
    bannerTemplate(model){
        return `<section role="dialog" aria-live="polite" aria-label="Your privacy" class="${model.classNames.banner}">
            <div class="privacy-content">
                <div class="wrap">
                    <!--googleoff: all-->
                    <div class="privacy-banner__title">Cookies</div>
                    <p>We use cookies to improve your experience on our site and show you personalised advertising.</p>
                    <p>Find out more from our <a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="/privacy-policy">privacy policy</a> and <a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="${model.policyURL}">cookie policy</a>.</p>
                    <button type="button" class="btn btn--primary ${model.classNames.acceptBtn}">Accept and close</button>
                    <a class="privacy-banner__link ${model.classNames.optionsBtn}" rel="noopener noreferrer nofollow" href="${model.policyURL}">Your options</a>
                    <!--googleon: all-->
                </div>
            </div>
        </section>`;
    },
    messageTemplate(model){
        return `<div class="${model.settings.classNames.formMessage}" aria-role="alert">${model.settings.savedMessage}</div>`;
    },
    formTemplate(model){
        return `<form id="preferences" class="${model.settings.classNames.form}" novalidate>
                ${Object.keys(model.settings.types).map(type => `<fieldset class="${model.settings.classNames.fieldset}">
                <legend class="${model.settings.classNames.legend}">
                    <span class="${model.settings.classNames.title}">${model.settings.types[type].title}</span>
                    <span class="${model.settings.classNames.description}">${model.settings.types[type].description}</span>
                </legend>
                <div class="form-row">
                    <div class="relative">
                        <label class="privacy-banner__label">
                            <input
                                class="${model.settings.classNames.field}"
                                type="radio"
                                name="privacy-${type.split(' ')[0].replace(' ', '-')}"
                                value="1"
                                ${model.consent[type] === 1 ? `checked` : ''}>
                            <span class="privacy-banner__label-text">I am OK with this</span>
                            <span class="privacy-banner__label-description">${model.settings.types[type].labels.yes}</span>
                        </label>    
                    </div>
                </div>
                <div class="form-row">
                    <div class="relative">
                        <label class="privacy-banner__label">
                            <input
                                class="${model.settings.classNames.field}"
                                type="radio"
                                name="privacy-${type.split(' ')[0].replace(' ', '-')}"
                                value="0"
                                ${model.consent[type] === 0 ? `checked` : ''}>
                            <span class="privacy-banner__label-text">No thank you</span>
                            <span class="privacy-banner__label-description">${model.settings.types[type].labels.no}</span>
                        </label>    
                    </div>
                </div>
            </fieldset>`).join('')}
            <button class="${model.settings.classNames.submitBtn}"${Object.keys(model.consent).length !== Object.keys(model.settings.types).length ? ` disabled` : ''}>Save my settings</button>
        </form>`;
    }
};