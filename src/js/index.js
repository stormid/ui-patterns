import ExpandableNav from './modules/expandable-navigation';
import FullScreenNav from './modules/full-screen-navigation';
import ModalSearch from './modules/modal-search';
import ExpandableSection from './modules/expandable-section';
import ExpandableSearch from './modules/expandable-search';
import ExclusiveToggles from './modules/exclusive-toggles';
import ModalConfirmation from './modules/modal-confirmation';
import CookieBanner from './modules/cookie-banner';
import Validation from './modules/form-validation';
import Tabs from './modules/tabs';

export const initStack = [
    ExpandableNav,
    FullScreenNav,
    ModalSearch,
    ExpandableSection,
    ExpandableSearch,
    ExclusiveToggles,
    ModalConfirmation,
    CookieBanner,
    Tabs,
    Validation
    // Importer(`tabs`)
    // () => { import(/* webpackChunkName: "toggle" */`./features/toggle`).then(module => module.default()); },
    // () => { import(/* webpackChunkName: "validate" */`@stormid/validate`).then(module => module.default.init(VALIDATE.SELECTOR)); },
    // Importer.bind(null, 'validate')(import(/* webpackChunkName: "validate" */`@stormid/validate`)),
];