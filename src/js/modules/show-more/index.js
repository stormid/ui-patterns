import toggle from '@stormid/toggle';

export default () => {
    const [ instance ] = toggle('.js-show-more', {
        local: true,
        focus: false,
        callback({ node, toggles, isOpen }){
            if (isOpen) {
                toggles[0].textContent = 'Hide';
                toggles[0].previousElementSibling.focus();
            } else {
                toggles[0].textContent = 'Show more';
            }
        }
    });
};