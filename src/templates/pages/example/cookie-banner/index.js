import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Cookie banner example';

const CookieBanner = () => <ExampleLayout>
    <main class="wrap soft-top" id="js-cookie-banner-example">
        <h1 class="visuallyhidden">Cookie banner example</h1>
        <Code />
        <button class="cookie-banner__delete">Restart</button>
    </main>
</ExampleLayout>;

export default CookieBanner;