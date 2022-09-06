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
    { title: 'Expandable navigation', url: '/patterns/expandable-navigation', status: STATUS.DEVELOPMENT },
    { title: 'Full screen navigation', url: '/patterns/full-screen-navigation', status: STATUS.DEVELOPMENT },
    { title: 'Expandable search', url: '/patterns/expandable-search', status: STATUS.DEVELOPMENT },
    { title: 'Modal search', url: '/patterns/modal-search', status: STATUS.DEVELOPMENT },
    { title: 'Expandable section', url: '/patterns/expandable-section', status: STATUS.DEVELOPMENT },
    { title: 'Exclusive toggles', url: '/patterns/exclusive-toggles', status: STATUS.DEVELOPMENT },
    { title: 'Modal confirmation', url: '/patterns/modal-confirmation', status: STATUS.DEVELOPMENT },
    // { title: 'Cookie banner', url: '/patterns/cookie-banner', status: STATUS.DEVELOPMENT },
    { title: 'Tabs', url: '/patterns/tabs', status: STATUS.DEVELOPMENT },
    { title: 'Form validation', url: '/patterns/form-validation', status: STATUS.DEVELOPMENT },
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
</DefaultLayout>;

export default HomePage;