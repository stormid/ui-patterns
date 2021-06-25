import OffCanvasNav from './modules/off-canvas-navigation';
import ModalSearch from './modules/modal-search';
import ExpandableSection from './modules/expandable-section';

export const initStack = [
    OffCanvasNav,
    ModalSearch,
    ExpandableSection
    // Importer(`tabs`)
    // () => { import(/* webpackChunkName: "toggle" */`./features/toggle`).then(module => module.default()); },
    // () => { import(/* webpackChunkName: "validate" */`@stormid/validate`).then(module => module.default.init(VALIDATE.SELECTOR)); },
    // Importer.bind(null, 'validate')(import(/* webpackChunkName: "validate" */`@stormid/validate`)),
];