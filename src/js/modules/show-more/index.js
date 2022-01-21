import toggle from '@stormid/toggle';
const SELECTOR = '.js-show-more';

export default () => {
    if (!document.querySelector(SELECTOR)) return;
    const [ instance ] = toggle(SELECTOR, {
        local: true,
        focus: false,
        callback({ node, toggles, isOpen }){
            if (isOpen) {
                toggles[0].textContent = 'Show less';
                toggles[0].previousElementSibling.focus();
            } else {
                toggles[0].textContent = 'Show more';
            }
        }
    });
};