import toggle from '@stormid/toggle';
const SELECTOR = '.js-expandable-nav';
const SHOW_LABEL_ATTRIBUTE = 'data-show-label';
const HIDE_LABEL_ATTRIBUTE = 'data-hide-label';

export const init = () => {
    if (document.querySelector(SELECTOR)) {
        const toggleInstances = toggle(SELECTOR, { focus: false });
        const toggleAriaLabel = e => {
            const { toggles } = e.detail.getState();

            toggles.forEach(btn => {
                if (!btn.hasAttribute(SHOW_LABEL_ATTRIBUTE) && !!btn.hasAttribute(SHOW_LABEL_ATTRIBUTE)) return;
                btn.setAttribute('aria-label', (btn.getAttribute('aria-expanded') === 'true') ? btn.getAttribute(HIDE_LABEL_ATTRIBUTE) : btn.getAttribute(SHOW_LABEL_ATTRIBUTE));
            });
        };

        toggleInstances.forEach(instance => {
            instance.getState().node.addEventListener('toggle.open', toggleAriaLabel);
            instance.getState().node.addEventListener('toggle.close', toggleAriaLabel);
        });

        return toggleInstances;
    }
};

init();