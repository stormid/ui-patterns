import modal from '@stormid/modal';
import toggle from '@stormid/toggle';
import { MODAL, TOGGLE } from '../../constants';

export default () => {
    if (document.querySelector(MODAL.SELECTOR.MODAL_NAVIGATION)) {
        const [ instance ] = modal(MODAL.SELECTOR.MODAL_NAVIGATION);
        
        window.addEventListener('resize', e => {
            if (window.matchMedia('(min-width: 1024px)').matches) {
                const { isOpen, toggles } = instance.getState();
                if (isOpen) toggles[0].click();
            }
        });
    }
    if (document.querySelector(TOGGLE.SELECTOR.MODAL_FISHY_NAVIGATION)) {
        const [ instance ] = toggle(TOGGLE.SELECTOR.MODAL_FISHY_NAVIGATION, {
            trapTab: true,
            focus: true,
            callback({ isOpen, node }) {
                const cachedFocusable = document.activeElement;
                if(isOpen) {
                    document.body.insertBefore(node.parentNode, document.body.firstElementChild);
                    cachedFocusable.focus();
                    [].slice.call(document.body.children).forEach(el => {
                        if(el === node.parentNode) return;
                        el.setAttribute('aria-hidden', "true");
                    });
                } else {
                    document.querySelector('.modal-nav').insertBefore(node.parentNode, document.querySelector('.modal-nav').firstElementChild);
                    [].slice.call(document.body.children).forEach(el => {
                        if(el === node.parentNode) return;
                        el.removeAttribute('aria-hidden');
                    });
                }
            },
        });
        window.addEventListener('resize', e => {
            if (window.matchMedia('(min-width: 1024px)').matches) {
                const { isOpen } = instance.getState();
                if (isOpen) instance.startToggle();
            }
        });
        document.addEventListener('keydown', e => {
            if (e.keyCode !== 27) return;
            const { isOpen } = instance.getState();
            if (isOpen) instance.startToggle();
        });
    }
    if (document.querySelector(TOGGLE.SELECTOR.NON_MODAL_NAVIGATION)) {
        return toggle(TOGGLE.SELECTOR.NON_MODAL_NAVIGATION, {
            focus: true,
            closeOnBlur: true
        });
    }
};