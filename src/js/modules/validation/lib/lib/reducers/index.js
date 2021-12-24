import { ACTIONS, DOTNET_ERROR_SPAN_DATA_ATTRIBUTE, GROUP_ATTRIBUTE } from '../constants';

export default {
    [ACTIONS.SET_INITIAL_STATE]: (state, data) => Object.assign({}, state, data),
    [ACTIONS.CLEAR_ERRORS]: state => Object.assign({}, state, {
        groups: Object.keys(state.groups).reduce((acc, group) => {
            acc[group] = Object.assign({}, state.groups[group], {
                errorMessages: [],
                valid: true
            });
            return acc;
        }, {})
    }),
    [ACTIONS.CLEAR_ERROR]: (state, data) => {
        const nextGroup = {};
        nextGroup[data] = Object.assign({}, state.groups[data], {
            errorMessages: [],
            valid: true
        });
        return Object.assign({}, state, {
            groups: Object.assign({}, state.groups, nextGroup)
        });
    },
    [ACTIONS.ADD_GROUP]: (state, data) => Object.assign({}, state, {
        groups: Object.assign({}, state.groups, data)
    }),
    [ACTIONS.REMOVE_GROUP]: (state, groupName) => Object.assign({}, state, {
        groups: Object.keys(state.groups).reduce((acc, group) => {
            if (group !== groupName) acc[group] = state.groups[group];
            return acc;
        }, {})
    }),
    [ACTIONS.ADD_VALIDATION_METHOD]: (state, data) => {
        const nextGroup = Object.assign({},
            state.groups[data.groupName]
                ? state.groups[data.groupName]
                : {},
            state.groups[data.groupName]
                ?  { validators: [...state.groups[data.groupName].validators, data.validator] }
                : {
                    fields: data.fields || (document.querySelector(`[data-val-${GROUP_ATTRIBUTE}="${data.groupName}"]`) ? [].slice.call(document.querySelectorAll(`[data-val-${GROUP_ATTRIBUTE}="${data.groupName}"]`)) : [].slice.call(document.getElementsByName(data.groupName))),
                    serverErrorNode: document.querySelector(`[${DOTNET_ERROR_SPAN_DATA_ATTRIBUTE}=${data.groupName}]`) || false,
                    valid: false,
                    validators: [data.validator],
                });

        return Object.assign({}, state, {
            groups: Object.assign({}, state.groups, { [data.groupName]: nextGroup })
        });
    },
    [ACTIONS.VALIDATION_ERRORS]: (state, data) => Object.assign({}, state, {
        realTimeValidation: true,
        groups: Object.keys(state.groups).reduce((acc, group) => {
            acc[group] = Object.assign({}, state.groups[group], data[group]);
            return acc;
        }, {})
    }),
    [ACTIONS.VALIDATION_ERROR]: (state, data) => {
        return Object.assign({}, state, {
            groups: Object.assign({}, state.groups, {
                [data.group]: Object.assign({}, state.groups[data.group], {
                    errorMessages: data.errorMessages,
                    valid: false
                })
            })
        });
    },
    [ACTIONS.START_REALTIME]: (state, data) => Object.assign({}, state, data),
};

    