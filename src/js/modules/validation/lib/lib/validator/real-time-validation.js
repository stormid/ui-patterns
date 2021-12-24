import { ACTIONS } from '../constants';
import {
    getGroupValidityState,
    resolveRealTimeValidationEvent,
    reduceGroupValidityState,
    reduceErrorMessages
} from './';
import {
    clearError,
    renderError
}  from '../dom';

/**
 * Starts real-time validation on each group, adding an eventListener to each field 
 * that resets the validityState for the field's group and acquires the new validity state
 * 
 * The event that triggers validation is defined by the field type
 * 
 * Only if the new validityState is invalid is the validation error object 
 * dispatched to the store to update state and render the error
 * 
 */
export const initRealTimeValidation = Store => {
    const handler = groupName => () => {
        const { groups, errors } = Store.getState();
        
        if (!groups[groupName].valid && errors[groupName]) {
            Store.dispatch(ACTIONS.CLEAR_ERROR, groupName, [ clearError(groupName) ]);
        }
        getGroupValidityState(groups[groupName])
            .then(res => {
                if (!res.reduce(reduceGroupValidityState, true)) {
                    Store.dispatch(
                        ACTIONS.VALIDATION_ERROR,
                        {
                            group: groupName,
                            errorMessages: res.reduce(reduceErrorMessages(groupName, Store.getState()), [])
                        },
                        [ renderError(groupName) ]
                    );
                }
            });
    };

    Object.keys(Store.getState().groups).forEach(groupName => {

        const { groups } = Store.getState();
        const groupUpdate = {...groups};
        
        if(!groupUpdate[groupName].hasEvent) {
            groupUpdate[groupName].fields.forEach(input => {
                input.addEventListener(resolveRealTimeValidationEvent(input), handler(groupName));
            });

            //;_; can do better?
            const equalToValidator = groupUpdate[groupName].validators.filter(validator => validator.type === 'equalto');
            
            if (equalToValidator.length > 0){
                equalToValidator[0].params.other.forEach(subgroup => {
                    subgroup.forEach(item => {
                        item.addEventListener('blur', handler(groupName));
                    });
                });
            }
            
            groupUpdate[groupName].hasEvent = true;
        }
      
        Store.dispatch(ACTIONS.START_REALTIME, {
            groups: groupUpdate
        });
    });
};