import toggle from '@stormid/toggle';
const SELECTORS = {
    NODE: '.js-show-more',
    BLOCK: '.js-show-more__block',
    MORE_BTN: '.js-show-more__btn',
}

export const showMoreFocus = (isOpen, currentBlock, currentShowMore) => {
    if (isOpen) {
        currentBlock.setAttribute('tabindex', '-1');
        currentBlock.focus();
    } else {
        currentBlock.removeAttribute('tabindex', '-1');
        currentShowMore.focus();
    }
}

export const init = () => {

    const nodes = Array.from(document.querySelectorAll(SELECTORS.NODE));
    const initialised = [];

    nodes.forEach((node) => {
        const currentBlock = node.querySelector(SELECTORS.BLOCK);
        const currentShowMore = node.querySelector(SELECTORS.MORE_BTN);
        if(!currentBlock || !currentShowMore) return;

        const showMoreToggle = toggle(currentBlock, { 
            focus: false, 
            local: true,
            callback: (tog) => showMoreFocus(tog.isOpen, currentBlock, currentShowMore)
        });
        initialised.push(showMoreToggle);
    })

    return initialised;
};

init();