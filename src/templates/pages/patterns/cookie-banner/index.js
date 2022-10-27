import { h } from 'preact';
import PatternLayout from '@layouts/pattern';
import PatternTitle from '@components/pattern-title';
import DependencyTable from '@components/dependency-table';
import { STATUS } from '@constants';

export const title = 'Cookie banner';

export const status = STATUS.RELEASE;

const CookieBanner = () => <PatternLayout>
    <PatternTitle status={status}>Cookie banner</PatternTitle>
    <p class="push-bottom">An implementation of the ICO/GDPR compliant <a href="https://github.com/stormid/components/tree/master/packages/cookie-banner" target="_blank" rel="noreferrer noopener nofollow">Storm Cookie Banner</a>, with the cookie consent form embedded within the banner.</p>
    
    <h2 class="push-bottom--half plus-2 medium">Example</h2>
    <iframe style="--height: 375px" class="example" title="Example expandable section" src={'/example/cookie-banner'}></iframe>
    <p class="push-bottom align-right"><a href="/example/cookie-banner" rel="noopener" target="_blank">Open in a new tab</a></p>
    
    <h2 class="push-bottom--half plus-1 medium">Dependencies and installation</h2>
    <DependencyTable dependencies={[
        { package: '@stormid/cookie-banner', installation: 'npm i -S @stormid/cookie-banner' },
        { package: '@stormid/toggle', installation: 'npm i -S @stormid/toggle' }
    ]} />

    <h2 class="push-bottom--half plus-1 medium">Code</h2>
    <pre class="pre"><code class="code">{`import cookieBanner from '@stormid/cookie-banner';
import toggle from '@stormid/toggle';

const config = {
    name: '.Patterns.Consent', //name of the consent cookie
    tid: '', //tid of GA account anonymously measuring interactions with the banner 
    policyURL: '#', //url of cookie policy page
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
            fns: [] //array of functions that set performance cookies, usually including the Google Analytics performance container initialisation
        },
        thirdParty: {
            title: 'Third-party services and advertising',
            description: 'Some functionality of our website relies on third-party services such as video providers and social media content. These services may set their own cookies on behalf of their advertisers. You can choose whether we allow these cookies to be set or not. If you decline, some functions of the website may not work as expected.',
            labels: {
                yes: 'You agree to allow third-party and advertising cookies',
                no: 'You do not agree to third-party and advertising cookies'
            },
            fns: [ //array of functions that set third-party cookies
                () => {
                    //render all iframes
                    [].slice.call(document.querySelectorAll('[data-iframe-src]')).forEach(node => {
                        const iframe = document.createElement('iframe');
                        iframe.src = node.getAttribute('data-iframe-src');
                        iframe.setAttribute('title', node.getAttribute('data-iframe-title') || 'iFrame embed');
                        iframe.style.width =  node.getAttribute('data-iframe-width' || '100%');
                        iframe.setAttribute('tabindex', '0');
                        iframe.setAttribute('frameborder', '0');
                        iframe.setAttribute('webkitallowfullscreen', 'webkitallowfullscreen');
                        iframe.setAttribute('mozallowfullscreen', 'mozallowfullscreen');
                        iframe.setAttribute('allowfullscreen', 'allowfullscreen');
                        iframe.setAttribute('scrolling', 'no');
                        node.parentNode.appendChild(iframe);
                        node.parentNode.removeChild(node);
                    });
                }
            ]
        }
    },
    bannerTemplate(model){
        return \`<section role="dialog" aria-live="polite" aria-label="Cookies" class="\${model.classNames.banner}">
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
    }
};

let bannerToggle;
document.addEventListener('banner.show', _ => [ bannerToggle ] = toggle('.js-toggle-banner'));
document.addEventListener('banner.hide', _ => bannerToggle.startToggle());

const banner = cookieBanner(config);

[].slice.call(document.querySelectorAll('.js-preferences-update')).forEach(btn => btn.addEventListener('click', e => {
    banner.showBanner();
    bannerToggle.startToggle();
}));

`}</code></pre>
    <h2 class="push-bottom plus-2 medium">Acceptance criteria</h2>
    <p class="push-bottom--double">The following is a list of example acceptance criteria to test against when using this pattern.  These critera should test that the specific markup requirements are met, and that the cookie banner behaves visually and functionally as expected.</p>

    <h3 class="push-bottom--half plus-1 medium">For validation in developer tools / web inspector</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The cookie banner should be an HTML element with a <pre class="pre--inline">role="dialog"</pre> attribute. This element must contain everything that's visible within the banner when it opens</li>
        <li class="list-item">The cookie banner element should either have an <pre class="pre--inline">aria-label</pre> attribute which titles the content, or an <pre class="pre--inline">aria-labelledby</pre> attribute that points to a visible <pre class="pre--inline">&lt;h2&gt;</pre> element with a matching ID</li>
        <li class="list-item">An HTML <pre class="pre--inline">&lt;button&gt;</pre> element should be present to accept all cookies</li>
        <li class="list-item">An HTML <pre class="pre--inline">&lt;button&gt;</pre> element should be present to expand the consent form and show the available cookie options</li>
        <li class="list-item">Within the preferences form an HTML <pre class="pre--inline">&lt;button&gt;</pre> element should be present to accept all cookies</li>
        <li class="list-item">Within the preferences form an HTML <pre class="pre--inline">&lt;button&gt;</pre> element should be present to save user preferences</li>
        <li class="list-item">Any form inputs within the cookie preferences form should have a matching <pre class="pre--inline">&lt;label&gt;</pre> describing the choice</li>
        <li class="list-item">All cookie selection inputs within the cookie preferences form should be grouped in <pre class="pre--inline">&lt;fiedset&gt;</pre> tags with appropiate <pre class="pre--inline">&lt;legend&gt;</pre> tags for each cookie type</li>
    </ul>

    <h3 class="push-bottom--half plus-1 medium">For functional validation</h3>
    <ul class="list list--tick push-bottom--double">
        <li class="list-item">The cookie banner should only appear if the user has not previously set their cookie preferences</li>
        <li class="list-item">On selecting 'accept all cookies' the banner should immediately close</li>
        <li class="list-item">On opening the cookie preferences form, the visual and keyboard focus should move to an HTML <pre class="pre--inline">&lt;button&gt;</pre> element which acts as a shortcut to accept all cookies and close the banner</li>
        <li class="list-item">Once the preferences form is open, a user should be able to click/tab/swipe through the available cookie types and set their preference</li>
        <li class="list-item">The button for saving the user preferences should be disabled until a user has made a choice for all cookie types</li>
        <li class="list-item">Once the user has saved their preferences via the banner, the banner should close and not re-appear until the user clears their cookies, or until the preference cookie expires (1 year from date set)</li>
        <li class="list-item">No functionality or third-party service that sets cookies should run until the user has consented to that type of cookie</li>
        <li class="list-item">When the banner has closed and a user has accepted a cookie type, any functionality that relies on that cookie type (eg. analytics) should immediately run</li>
        <li class="list-item">Consent should be saved in the browser when the user returns to the site, unless the user has cleared their cookies, or until the preference cookie expires (1 year from date set)</li>
    </ul>

    <h2 class="push-bottom--half plus-2 medium">References</h2>
    <ul class="list push-bottom--double">
       <li class="list-item"><a href="https://webaim.org/standards/wcag/checklist" rel="noopener nofollow">https://webaim.org/standards/wcag/checklist</a></li>
       <li class="list-item"><a href="https://uxdesign.cc/cookie-banners-and-accessibility-d476bf9ee4fc" rel="noopener nofollow">https://uxdesign.cc/cookie-banners-and-accessibility-d476bf9ee4fc</a></li>
    </ul>
</PatternLayout>;

export default CookieBanner;