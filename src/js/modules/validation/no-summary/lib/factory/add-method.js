import { ACTIONS } from '../constants';

/**
 * Adds a custom validation method to the validation model, used via the API
 * Dispatches add validation method to store to update the validators in a group
 * 
 * @param groupName [String] The name attribute shared by the DOM nodes in the group
 * @param method [Function] The validation method (function that returns true or false) that is called on the group
 * @param message [String] Te error message displayed if the validation method returns false
 * 
 */
export const addMethod = Store => (groupName, method, message) => {
    if ((groupName === undefined || method === undefined || message === undefined) || !Store.getState()[groupName] && (document.getElementsByName(groupName).length === 0  && [].slice.call(document.querySelectorAll('[data-val-group="'+groupName+'"]')).length === 0))
        return console.warn('Custom validation method cannot be added.');
    Store.dispatch(ACTIONS.ADD_VALIDATION_METHOD, { groupName, validator: { type: 'custom', method, message } });
};