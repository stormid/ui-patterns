import { removeUnvalidatableGroups, assembleValidationGroup } from '../validator';
import { initRealTimeValidation } from '../validator/real-time-validation';
import { clearError, addAXAttributes } from '../dom';
import { ACTIONS } from '../constants';

/**
 * Adds a group to the validation model, used via the API
 * Dispatches add group method to store 
 * 
 * @param nodes [Array], nodes comprising the group
 * 
 */
export const addGroup = Store => nodes => {
    const groups = removeUnvalidatableGroups(nodes.reduce(assembleValidationGroup, {}));
    if (Object.keys(groups).length === 0) return console.warn('Group cannot be added.');

    Store.dispatch(ACTIONS.ADD_GROUP, groups, [ addAXAttributes, () => {
        if (Store.getState().realTimeValidation) {
            //if we're already in realtime validation then we need to re-start it with the newly added group
            initRealTimeValidation(Store);
        }
    }]);
};

/**
 * Removes a group to the validation model, used via the API
 * Dispatches remove group method to store 
 * 
 * @param groupName, nodes comprising the group
 * 
 */
export const removeGroup = Store => groupName => {
    const state = Store.getState();
    if (state.errors[groupName]) clearError(groupName)(state);
    Store.dispatch(ACTIONS.REMOVE_GROUP, groupName);
};