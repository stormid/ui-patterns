import { h } from 'preact';
import DefaultLayout from '@layouts/default';
import { STATUS } from '@constants';
import Status from '@components/status';
import { status as cookieBannerStatus } from './patterns/cookie-banner';
import { status as expandableNavigationStatus } from './patterns/expandable-navigation';
import { status as fullScreenNavigationStatus } from './patterns/full-screen-navigation';
import { status as modalSearchStatus } from './patterns/modal-search';
import { status as expandableSearchStatus } from './patterns/expandable-search';
import { status as expandableSectionStatus } from './patterns/expandable-section';
import { status as exclusiveTogglesStatus } from './patterns/exclusive-toggles';
import { status as modalConfirmationStatus } from './patterns/modal-confirmation';
import { status as tabsStatus } from './patterns/tabs';
import { status as formValidationStatus } from './patterns/form-validation';

export const title = 'Home';

// export const meta = [{
//     name: 'description',
//     content: ''
// }];

const PATTERNS = [
    { title: 'Expandable navigation', url: '/patterns/expandable-navigation', status: expandableNavigationStatus },
    { title: 'Full screen navigation', url: '/patterns/full-screen-navigation', status: fullScreenNavigationStatus },
    { title: 'Expandable search', url: '/patterns/expandable-search', status: expandableSearchStatus },
    { title: 'Modal search', url: '/patterns/modal-search', status: modalSearchStatus },
    { title: 'Expandable section', url: '/patterns/expandable-section', status: expandableSectionStatus },
    { title: 'Exclusive toggles', url: '/patterns/exclusive-toggles', status: exclusiveTogglesStatus },
    { title: 'Modal confirmation', url: '/patterns/modal-confirmation', status: modalConfirmationStatus },
    { title: 'Cookie banner', url: '/patterns/cookie-banner', status: cookieBannerStatus },
    { title: 'Tabs', url: '/patterns/tabs', status: tabsStatus },
    { title: 'Form validation', url: '/patterns/form-validation', status: formValidationStatus },
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