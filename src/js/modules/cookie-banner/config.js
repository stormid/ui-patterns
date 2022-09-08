import { initIFrame } from './utils';

export default {
    name: '.Patterns.Consent',
    tid: 'UA-401849-33',
    policyURL: '#',
    hideBannerOnFormPage: true,
    types: {
        performance: {
            suggested: true, //set as pre-checked on consent form as a suggested response
            title: 'Performance',
            description: 'Performance cookies are used to measure the performance of our website and make improvements.  Your personal data is not used. For example, we will measure the links you click, but we will not know that it was you that clicked them.',
            labels: {
                yes: 'You agree to us using cookies to improve the service',
                no: 'You do not agree to us using cookies to improve the service'
            },
            fns: [
                () => {}
            ]
        },
        thirdParty: {
            title: 'Third-party services and advertising',
            description: 'Some functionality of our website relies on third-party services such as video providers and social media content. These services may set their own cookies on behalf of their advertisers. You can choose whether we allow these cookies to be set or not. If you decline, some functions of the website may not work as expected.',
            labels: {
                yes: 'You agree to allow third-party and advertising cookies',
                no: 'You do not agree to third-party and advertising cookies'
            },
            fns: [ initIFrame ]
        }
    },
    bannerTemplate(model){
        return `<section role="dialog" aria-live="polite" aria-label="Cookies" class="${model.classNames.banner}">
            <div class="privacy-content">
                <div class="wrap">
                    <div class="col xs-12 privacy-banner__inner">
                        <!--googleoff: all-->
                        <div class="privacy-banner__content">
                            <div class="privacy-banner__title">Cookies</div>
                            <p class="privacy-banner__summary">This web service uses cookies to ensure it functions correctly, and to help gather analytics data which is used to help us improve the service.</p>
                            <p class="privacy-banner__summary">Find out more from our <a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="/privacy">privacy policy</a> and <a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="${model.policyURL}">cookie policy</a>.</p>
                        </div>
                        <div class="privacy-banner__actions">
                            <button type="button" class="privacy-banner__btn ${model.classNames.acceptBtn}">Accept and close</button>
                            <button type="button" class="privacy-banner__link js-toggle__preferences ${model.classNames.optionsBtn}">Your options</button>
                        </div>
                        <div id="preferences" class="privacy-banner__panel js-toggle-banner" data-toggle="js-toggle__preferences">
                            <p><button type="button" class="privacy-banner__btn-text ${model.classNames.acceptBtn}">Accept and close </button> or edit your choices below and click 'Save my choices'.</p>
                            <div class="privacy-banner__form-container"></div>
                        </div>
                        <!--googleon: all-->
                    </div>
                </div>
            </div>
        </section>`;
    },
    formTemplate(model){
        return `<form id="preferences-form" class="row ${model.settings.classNames.form}" novalidate>
                ${Object.keys(model.settings.types).map(type => `<div class="privacy-banner__col col"><fieldset class="${model.settings.classNames.fieldset}">
                <legend class="${model.settings.classNames.legend}">
                    <span class="${model.settings.classNames.title}">${model.settings.types[type].title}</span>
                    <span class="${model.settings.classNames.description}">${model.settings.types[type].description}</span>
                </legend>
                <div class="privacy-banner__row">
                    <div class="relative">
                        <label class="privacy-banner__label">
                            <input
                                class="${model.settings.classNames.field}"
                                type="radio"
                                name="privacy-${type.split(' ')[0].replace(' ', '-')}"
                                value="1"
                                ${model.consent[type] === 1 ? ` checked` : ''}>
                            <span class="privacy-banner__label-text">Ok</span>
                            <span class="privacy-banner__label-description">${model.settings.types[type].labels.yes}</span>
                        </label>    
                    </div>
                </div>
                <div class="privacy-banner__row">
                    <div class="relative">
                        <label class="privacy-banner__label">
                            <input
                                class="${model.settings.classNames.field}"
                                type="radio"
                                name="privacy-${type.split(' ')[0].replace(' ', '-')}"
                                value="0"
                                ${model.consent[type] === 0 ? ` checked` : ''}>
                            <span class="privacy-banner__label-text">No</span>
                            <span class="privacy-banner__label-description">${model.settings.types[type].labels.no}</span>
                        </label>    
                    </div>
                </div>
            </fieldset></div>`).join('')}
            <div class="privacy-banner__set col">
                <button class="${model.settings.classNames.submitBtn}"${Object.keys(model.consent).length !== Object.keys(model.settings.types).length ? ` disabled` : ''}>Save my choices</button>
                <div class="privacy-banner__set-accept">Or <button type="button" class="privacy-banner__btn-text ${model.settings.classNames.acceptBtn}">Accept and close</button></div>
            </div>
        </form>`;
    },
};