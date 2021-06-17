import { h } from 'preact';
import DefaultLayout from '@layouts/default';

export const title = 'Home';

// export const meta = [{
//     name: 'description',
//     content: ''
// }];

const PATTERNS = [
    { title: 'Off-screen navigation', summary: 'Show and hide navigation with a button', url: '/patterns/off-canvas' },
    { title: 'Modal search', url: '/patterns/modal-search' },
    { title: 'Collapsable section', url: '/patterns/collapsable-section' },
    { title: 'Linked header buttons', summary: 'Off-canvas navigation and modal search that can only be open one at a time', url: '/patterns/linked-header-buttons' },
    { title: 'Modal confirmation', summary: 'Ask users to confirm before performing an action', url: '/patterns/modal-confirmation' },
    { title: 'Cookie banner', url: '/patterns/cookie-banner' },
    { title: 'Form validation', url: '/patterns/form-validation' },
    { title: 'Tabs', url: '/patterns/tabs' },
    { title: 'Modal gallery', url: '/patterns/modal-gallery' },
];

const HomePage = () => <DefaultLayout>
    <ul class="card-list">
        { PATTERNS.map(pattern => <li class="card-list__item">
            <h2 class="card-list__title">
                <a class="card-list__link" href={pattern.url}>{pattern.title}</a>
            </h2>
            {pattern.summary && <p class="card-list__summary">{pattern.summary}</p>}
            {/* <ul class="tag-list">
                <li class="tag">toggle</li>
                <li class="tag">accordion</li>
                <li class="tag">show/hide</li>
                <li class="tag">expandable</li>
            </ul> */}
        </li>) }
    </ul>
</DefaultLayout>;

export default HomePage;