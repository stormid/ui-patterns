import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Cookie banner';

const CookieBanner = () => <PatternLayout>
    <PatternTitle status={STATUS.DEVELOPMENT}>Cookie banner</PatternTitle>
    <p class="push-bottom">An implementation of the <a href="https://github.com/stormid/components/tree/master/packages/cookie-banner" target="_blank" rel="noreferrer noopener nofollow">Storm Cookie Banner</a> with the cookie preference form embedded within the banner itself.</p>
    
    <h2 class="push-bottom--half plus-1 medium">Guidance</h2>
    <p class="push-bottom--double">The embedded preference selection requires a custom banner and form template to be passed to the cookie banner component, as shown in the code example.  The form can still be used stand-alone in a cookie policy page, as per the original component documentation.</p>
    
    <h2 class="push-bottom--half plus-1 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example expandable section" src={'/example/cookie-banner'}></iframe>
    <p class="push-bottom align-right"><a href="/example/cookie-banner" rel="noopener" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-1 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[
        { package: '@stormid/cookie-banner', installation: 'npm i -S @stormid/cookie-banner' },
        { package: '@stormid/toggle', installation: 'npm i -S @stormid/toggle' }
    ]} />

    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`
import cookieBanner from '@stormid/cookie-banner';

const banner = cookieBanner({
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
            fns: [
                () => {}
            ]
        }
    },
    bannerTemplate(model){
        return \`<section role="dialog" aria-live="polite" aria-label="Your privacy" class="\${model.classNames.banner}">
            <div class="privacy-content">
                <div class="wrap">
                    <div class="col xs-12 privacy-banner__inner">
                        <!--googleoff: all-->
                        <div class="privacy-banner__content">
                            <div class="privacy-banner__title">Cookies</div>
                            <p class="privacy-banner__summary">This web service uses cookies to ensure it functions correctly, and to help gather analytics data which is used to help us improve the service.</p>
                            <p class="privacy-banner__summary">Find out more from our <a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="/privacy">privacy policy</a> and <a class="privacy-banner__link" rel="noopener noreferrer nofollow" href="\${model.policyURL}">cookie policy</a>.</p>
                        </div>
                        <div class="privacy-banner__actions">
                            <button type="button" class="privacy-banner__btn \${model.classNames.acceptBtn}">Accept and close</button>
                            <button type="button" class="privacy-banner__link js-toggle__preferences \${model.classNames.optionsBtn}">Your options</button>
                        </div>
                        <div id="preferences" class="privacy-banner__panel js-toggle-banner" data-toggle="js-toggle__preferences">
                            <p><button type="button" class="privacy-banner__btn-text \${model.classNames.acceptBtn}">Accept and close </button> or edit your choices below and click 'Save my choices'.</p>
                            <div class="privacy-banner__form-container"></div>
                        </div>
                        <!--googleon: all-->
                    </div>
                </div>
            </div>
        </section>\`;
    },
    formTemplate(model){
        return \`<form id="preferences-form" class="row \${model.settings.classNames.form}" novalidate>
                \${Object.keys(model.settings.types).map(type => \`<div class="privacy-banner__col col"><fieldset class="\${model.settings.classNames.fieldset}">
                <legend class="\${model.settings.classNames.legend}">
                    <span class="\${model.settings.classNames.title}">\${model.settings.types[type].title}</span>
                    <span class="\${model.settings.classNames.description}">\${model.settings.types[type].description}</span>
                </legend>
                <div class="privacy-banner__row">
                    <div class="relative">
                        <label class="privacy-banner__label">
                            <input
                                class="\${model.settings.classNames.field}"
                                type="radio"
                                name="privacy-\${type.split(' ')[0].replace(' ', '-')}"
                                value="1"
                                \${model.consent[type] === 1 ? \` checked\` : ''}>
                            <span class="privacy-banner__label-text">Ok</span>
                            <span class="privacy-banner__label-description">\${model.settings.types[type].labels.yes}</span>
                        </label>    
                    </div>
                </div>
                <div class="privacy-banner__row">
                    <div class="relative">
                        <label class="privacy-banner__label">
                            <input
                                class="\${model.settings.classNames.field}"
                                type="radio"
                                name="privacy-\${type.split(' ')[0].replace(' ', '-')}"
                                value="0"
                                \${model.consent[type] === 0 ? \` checked\` : ''}>
                            <span class="privacy-banner__label-text">No</span>
                            <span class="privacy-banner__label-description">\${model.settings.types[type].labels.no}</span>
                        </label>    
                    </div>
                </div>
            </fieldset></div>\`).join('')}
            <div class="privacy-banner__set col">
                <button class="\${model.settings.classNames.submitBtn}"\${Object.keys(model.consent).length !== Object.keys(model.settings.types).length ? \` disabled\` : ''}>Save my choices</button>
                <div class="privacy-banner__set-accept">Or <button type="button" class="privacy-banner__btn-text \${model.settings.classNames.acceptBtn}">Accept and close</button></div>
            </div>
        </form>\`;
    },
});`}</code></pre>
    <h2 class="push-bottom--half plus-1 medium">Acceptance criteria</h2>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The cookie banner should load with the preferences form collapsed and not visible/tabbable/focusable</li>
        <li class="list-item">A primary button element should exist which allows the user to immediately accept all cookies and close the banner</li>
        <li class="list-item">A secondary button element should exist which is used to expand the preferences form</li>
        <li class="list-item">Once open, the focus should move to a button element which acts as a shortcut to accept all cookies and close the banner</li>
        <li class="list-item">Once open, a user should be able to click/tab/swipe through the available cookie types and set their preference</li>
        <li class="list-item">A primary button should be present for saving the user preferences. This is disabled until a user has made a choice for all cookie types</li>
        <li class="list-item">A secondary button should be available at the end of the form as a shortcut for the user to accept all cookie types and close the banner</li>
        <li class="list-item">Once the user has made their selections via the banner, the banner should close and not re-appear until the user clears their cookies, or until the preference cookie expires (1 year from date set)</li>
        <li class="list-item">No functionality that sets non-essential 'necessary' cookies should run until consented by the user</li>
        <li class="list-item">When the banner has closed and a user has accepted a cookie type, any functionality that relies on that cookie type (eg. analytics) should immediately run</li>
    </ul>
    <h2 class="push-bottom--half plus-1 medium">References</h2>
    <ul class="list push-bottom--double">
       <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
    </ul>
</PatternLayout>;

export default CookieBanner;