import { h } from 'preact';
import DefaultLayout from '@layouts/default';
import { STATUS } from '@constants';
import Status from '@components/status';


export const title = 'Home';

// export const meta = [{
//     name: 'description',
//     content: ''
// }];

const PATTERNS = [
    { title: 'Off-canvas navigation', url: '/patterns/off-canvas-navigation', status: STATUS.DEVELOPMENT },
    { title: 'Modal search', url: '/patterns/modal-search', status: STATUS.DEVELOPMENT },
    { title: 'Expandable section', url: '/patterns/expandable-section', status: STATUS.DEVELOPMENT },
    { title: 'Off-canvas search', url: '/patterns/off-canvas-search', status: STATUS.DEVELOPMENT },
    { title: 'Exclusive toggles', url: '/patterns/exclusive-toggles', status: STATUS.DEVELOPMENT },
    { title: 'Modal confirmation', url: '/patterns/modal-confirmation', status: STATUS.DEVELOPMENT },
    // { title: 'Cookie banner', url: '/patterns/cookie-banner' },
    { title: 'Tabs', url: '/patterns/tabs', status: STATUS.DEVELOPMENT },
    { title: 'Show more', url: '/patterns/show-more', status: STATUS.DEVELOPMENT },
    // { title: 'Form validation', url: '/patterns/form-validation' },
    // { title: 'Modal gallery', url: '/patterns/modal-gallery' },
];


const HomePage = () => <DefaultLayout>
    <div class="table__container">
        <table class="table">
            <thead>
                <tr>
                    <th class="th">Pattern</th>
                    <th class="th th--status">Status</th>
                </tr>
            </thead>
            <tbody>
                { 
                    PATTERNS.map(pattern => <tr class="tr">
                            <td class="td">
                                <a class="td__link" href={pattern.url}>{pattern.title}</a>
                            </td>
                            <td class="td td--status">
                                <Status type={pattern.status} />
                            </td>
                        </tr>)
                }
            </tbody>
        </table>
    </div>
    {/* <ul class="card-list">
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
            </ul>
        </li>) } 
    </ul>*/}
</DefaultLayout>;

export default HomePage;