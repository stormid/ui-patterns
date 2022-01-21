import OffCanvasNav from './modules/off-canvas-navigation';
import ModalSearch from './modules/modal-search';
import ExpandableSection from './modules/expandable-section';
import OffCanvasSearch from './modules/off-canvas-search';
import ExclusiveToggles from './modules/exclusive-toggles';
import ModalConfirmation from './modules/modal-confirmation';
import CookieBanner from './modules/cookie-banner';
import Tabs from './modules/tabs';
import ShowMore from './modules/show-more';

export const initStack = [
    OffCanvasNav,
    ModalSearch,
    ExpandableSection,
    OffCanvasSearch,
    ExclusiveToggles,
    ModalConfirmation,
    CookieBanner,
    Tabs,
    ShowMore
    // Importer(`tabs`)
    // () => { import(/* webpackChunkName: "toggle" */`./features/toggle`).then(module => module.default()); },
    // () => { import(/* webpackChunkName: "validate" */`@stormid/validate`).then(module => module.default.init(VALIDATE.SELECTOR)); },
    // Importer.bind(null, 'validate')(import(/* webpackChunkName: "validate" */`@stormid/validate`)),
];