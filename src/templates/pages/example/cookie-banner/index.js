import { h } from 'preact';
import ExampleLayout from '@layouts/example';
import Code from './code';

export const title = 'Cookie banner example';
export const bodyClass = 'example-body';

const CookieBanner = () => <ExampleLayout>
    <main class="wrap soft-top" id="js-cookie-banner-example">
        <h1 class="visuallyhidden">Cookie banner example</h1>
        <Code />
        <div class="embed">
            <div class="embed__placeholder" data-iframe-src={'https://www.youtube.com/embed/qpLKTUQev30'} data-iframe-title={'test video'}>
                <p>Update your cookie preferences to view this content.</p>
                <button type="button" class="embed__placeholder-btn js-preferences-update">Update preferences</button>
            </div>
        </div>
    </main>
</ExampleLayout>;

export default CookieBanner;