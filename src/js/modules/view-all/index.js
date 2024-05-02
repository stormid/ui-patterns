import toggle from '@stormid/toggle';
const SELECTORS = {
    NODE: '.js-expand-all',
    TOGGLES: '.js-expandable-section-all',
    BTN: '.js-expandable-section__btn-all'
}
const CLASSES = {
    OPEN: 'is--open'
}

export const init = () => {

    const nodes = Array.from(document.querySelectorAll(SELECTORS.NODE));
    const initialised = []

    nodes.forEach((node) => {
        if(!node.querySelector(SELECTORS.TOGGLES)) return;
        const innerToggles = toggle(Array.from(node.querySelectorAll(SELECTORS.TOGGLES)), { focus: false, local: true });
        const toggleAllBtns = Array.from(node.querySelectorAll(SELECTORS.BTN));
        const state = {
            allOpen: false
        }

        if(toggleAllBtns.length) {
            toggleAllBtns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    state.allOpen = !state.allOpen;
                    btn.setAttribute('aria-expanded', state.allOpen);
                    btn.classList.toggle(CLASSES.OPEN);
                    innerToggles.forEach((tog) => {
                        if(tog.getState().isOpen !== state.allOpen) tog.toggle();
                    })
                })
            })
        };  

        initialised.push({
            node: node,
            toggles: innerToggles,
            btns: toggleAllBtns,
            getState: () => {
                return state;
            }
        })
    })

    return initialised;
};

init();