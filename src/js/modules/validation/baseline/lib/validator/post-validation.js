import { isSubmitButton, hasNameValue, hasFormactionValue } from './utils';
import {
    createButtonValueNode,
    cleanupButtonValueNode
}  from '../dom';
import { PREHOOK_DELAY } from '../constants';

export const postValidation = (event, resolve, Store) => {
    const { settings, form } = Store.getState();
    let buttonValueNode = false;
    let cachedAction = false;
    const submit = () => {
        if (settings.submit) settings.submit();
        else form.submit();
    };
    if (isSubmitButton(document.activeElement)) {
        if (hasNameValue(document.activeElement)) {
            buttonValueNode = createButtonValueNode(document.activeElement, form);
        }
        if (hasFormactionValue(document.activeElement)) {
            cachedAction = form.getAttribute('action');
            form.setAttribute('action', document.activeElement.getAttribute('formaction'));
        }
    }
    if (event && event.target) {
        if (settings.preSubmitHook) {
            settings.preSubmitHook();
            window.setTimeout(submit, PREHOOK_DELAY);
        } else submit();
    }
    buttonValueNode && cleanupButtonValueNode(buttonValueNode);
    cachedAction && form.setAttribute('action', cachedAction);
    return resolve(true);
};