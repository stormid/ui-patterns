import modal from '@stormid/modal';
import toggle from '@stormid/toggle';
import { MODAL, TOGGLE } from '../../constants';

export default () => {
    if (document.querySelector(MODAL.SELECTOR.MODAL_NAVIGATION)) {
        return modal(MODAL.SELECTOR.MODAL_NAVIGATION);
    }
    if (document.querySelector(TOGGLE.SELECTOR.MODAL_FISHY_NAVIGATION)) {
        return toggle(TOGGLE.SELECTOR.MODAL_FISHY_NAVIGATION, {
            trapTab: true,
            focus: true,
            callback({ isOpen, node }) {
                const cachedFocusable = document.activeElement;
                if(isOpen) {
                    document.body.appendChild(node);
                    cachedFocusable.focus();

                    [].slice.call(document.body.children).forEach(el => {
                        if(el === node) return;
                        el.setAttribute('aria-hidden', "true");
                    });
                } else {
                    document.body.insertBefore(node, document.querySelector('#main'));
                    [].slice.call(document.body.children).forEach(el => {
                        if (el === node) return;
                        el.setAttribute('aria-hidden', "false");
                    });
                }
            },
        });
    }
    if (document.querySelector(TOGGLE.SELECTOR.NON_MODAL_NAVIGATION)) {
        return toggle(TOGGLE.SELECTOR.NON_MODAL_NAVIGATION, {
            focus: true,
            closeOnBlur: true
        });
    }
};