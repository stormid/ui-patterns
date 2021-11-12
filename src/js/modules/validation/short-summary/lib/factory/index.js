import { createStore } from '../store';
import { ACTIONS } from '../constants';
import { getInitialState } from '../validator';
import { validate }  from './validate';
import { clearErrors, renderErrorSummary }  from '../dom';
import { addMethod } from './add-method';
import { addGroup, removeGroup } from './group';

/**
 * Default function, sets initial state and adds form-level event listeners
 * 
 * @param form [DOM node] the form to validate
 * 
 * @returns [Object] The API for the instance
 * *
 */
export default (form, settings) => {
    const Store = createStore();
    Store.dispatch(ACTIONS.SET_INITIAL_STATE, getInitialState(form, settings), [ renderErrorSummary(Store) ]);
    form.addEventListener('submit', validate(Store));
    form.addEventListener('reset', () => Store.dispatch(ACTIONS.CLEAR_ERRORS, {}, [ clearErrors ]));

    return {
        getState: Store.getState,
        validate: validate(Store),
        addMethod: addMethod(Store),
        addGroup: addGroup(Store),
        removeGroup: removeGroup(Store)
    };
};