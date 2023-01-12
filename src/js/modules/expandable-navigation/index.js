import toggle from '@stormid/toggle';
const SELECTOR = '.js-expandable-nav';
const SHOW_LABEL = 'data-show-label';
const HIDE_LABEL = 'data-hide-label';

export const init = () => {
    if (document.querySelector(SELECTOR)) {
        var toggleInstances = toggle(SELECTOR, { focus: false });

        const toggleAriaLabel = e => {
            const { toggles } = e.detail.getState();
            toggles.forEach((btn) => {
                let newLabel = (btn.getAttribute('aria-expanded') === "true") ? btn.getAttribute(HIDE_LABEL) : btn.getAttribute(SHOW_LABEL);
                if(newLabel) btn.setAttribute('aria-label', newLabel);
            });
        }
    
        document.addEventListener('toggle.open', toggleAriaLabel);
        document.addEventListener('toggle.close', toggleAriaLabel);

        return toggleInstances;
    }
};

init();