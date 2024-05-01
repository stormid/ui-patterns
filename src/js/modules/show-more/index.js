import toggle from '@stormid/toggle';
const SELECTORS = {
    NODE: '.js-show-more',
    BLOCK: '.js-show-more__block',
    MORE_BTN: '.js-show-more__btn',
}

export const init = () => {

    const nodes = Array.from(document.querySelectorAll(SELECTORS.NODE));

    nodes.forEach((node) => {
        const currentBlock = node.querySelector(SELECTORS.BLOCK);
        const currentShowMore = node.querySelector(SELECTORS.MORE_BTN);
        if(!currentBlock || !currentShowMore) return;

        const showMoreToggle = toggle(currentBlock, { 
            focus: false, 
            local: true,
            callback: (tog) => {
                if (!tog.isOpen) currentShowMore.focus();
            }
        });
    })

};

init();