import toggle from '@stormid/toggle';
const SELECTORS = {
    NODE: '.js-expand-all',
    TOGGLES: '.js-expandable-section-all',
    BTN: '.js-expandable-section__btn-all'
}
const CLASSES = {
    OPEN: 'is--open'
}

const checkAllToggles = (toggles) => {
    return toggles.reduce((acc, tog) =>{
        return acc && tog.getState().isOpen;
    }, true);
}

const updateVewButton = (btns, allOpen) => {
    btns.forEach((btn) => {
        btn.setAttribute('aria-expanded', allOpen);
        btn.classList.toggle(CLASSES.OPEN);
    })
}

export const init = () => {

    const nodes = Array.from(document.querySelectorAll(SELECTORS.NODE));
    const initialised = []

    nodes.forEach((node) => {
        if(!node.querySelector(SELECTORS.TOGGLES)) return;
        const state = {
            allOpen: false,
            toggles: toggle(Array.from(node.querySelectorAll(SELECTORS.TOGGLES)), { 
                focus: false, 
                local: true, 
                callback: () => {
                    const newOpenState = checkAllToggles(state.toggles);
                    if(newOpenState !== state.allOpen) {
                        updateVewButton(state.btns, newOpenState);
                        state.allOpen = newOpenState;
                    }
                } }),
            btns: Array.from(node.querySelectorAll(SELECTORS.BTN))
        }

        if(state.toggles.length) {
            state.btns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    state.allOpen = !state.allOpen;
                    updateVewButton(state.btns, state.allOpen);
                    state.toggles.forEach((tog) => {
                        if(tog.getState().isOpen !== state.allOpen) tog.toggle();
                    })
                })
            })
        };  

        initialised.push({
            node: node,
            getState: () => {
                return state;
            }
        })
    })

    return initialised;
};

init();