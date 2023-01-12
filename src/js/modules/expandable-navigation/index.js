import toggle from '@stormid/toggle';
const SELECTOR = '.js-expandable-nav';
const SHOW_LABEL_ATTRIBUTE = 'data-show-label';
const HIDE_LABEL_ATTRIBUTE = 'data-hide-label';
const SHOW_LABEL_DEFAULT = "Show navigation menu";
const HIDE_LABEL_DEFAULT = "Hide navigation menu";

export const init = () => {
    if (document.querySelector(SELECTOR)) {
        var toggleInstances = toggle(SELECTOR, { focus: false });

        const toggleAriaLabel = e => {
            const { toggles } = e.detail.getState();

            toggles.forEach((btn) => {
                const isExpanded = btn.getAttribute('aria-expanded') === "true";
                let newLabel = (isExpanded) ? btn.getAttribute(HIDE_LABEL_ATTRIBUTE) : btn.getAttribute(SHOW_LABEL_ATTRIBUTE);
                btn.setAttribute('aria-label', (newLabel) ? newLabel : (isExpanded) ? HIDE_LABEL_DEFAULT : SHOW_LABEL_DEFAULT);
            });
        }
    
        document.addEventListener('toggle.open', toggleAriaLabel);
        document.addEventListener('toggle.close', toggleAriaLabel);

        return toggleInstances;
    }
};

init();