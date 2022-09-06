import { h } from 'preact';
import ExampleLayout from '@layouts/example';

export const title = 'Cookie banner example';

const CookieBanner = () => <ExampleLayout>
    <main class="wrap soft-top" id="js-cookie-banner-example">
        <h1 class="visuallyhidden">Cookie banner form example</h1>
        <div class="privacy-banner__form-container"></div>
        <div class="privacy-banner__form-announcement" style="position: absolute;width:1px;height:1px;opacity:0;" role="alert"></div>
    </main>
</ExampleLayout>;

export default CookieBanner;