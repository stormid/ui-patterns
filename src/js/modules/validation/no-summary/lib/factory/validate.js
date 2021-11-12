import { ACTIONS } from '../constants';
import {
    getValidityState,
    reduceGroupValidityState,
    isFormValid,
    reduceErrorMessages
} from '../validator';
import { postValidation } from '../validator/post-validation';
import { initRealTimeValidation } from '../validator/real-time-validation';
import {
    clearErrors,
    renderErrors,
    focusFirstInvalidField
}  from '../dom';

/**
 * Returns a function that extracts the validityState of the entire form
 * can be used as a form submit eventListener or via the API
 * 
 * Submits the form if called as a submit eventListener and is valid
 * Dispatches error state to Store if errors
 * 
 * @param Store [Store Object]
 * 
 * @returns [Promise] Resolves with boolean validityState of the form
 * 
 */
export const validate = Store => event => {
    event && event.preventDefault();
    Store.dispatch(ACTIONS.CLEAR_ERRORS, null, [clearErrors]);

    return new Promise(resolve => {
        const state = Store.getState();
        const { groups, realTimeValidation } = state;
        getValidityState(groups)
            .then(validityState => {
                if (isFormValid(validityState)) return postValidation(event, resolve, Store);

                if (realTimeValidation === false) initRealTimeValidation(Store);

                Store.dispatch(
                    ACTIONS.VALIDATION_ERRORS,
                    Object.keys(groups)
                        .reduce((acc, group, i) => (acc[group] = {
                            valid: validityState[i].reduce(reduceGroupValidityState, true),
                            errorMessages: validityState[i].reduce(reduceErrorMessages(group, state), [])
                        }, acc), {}),
                    [renderErrors(Store), focusFirstInvalidField]
                );
                
                return resolve(false);
            })
            .catch(err => console.warn(err));
    });
};