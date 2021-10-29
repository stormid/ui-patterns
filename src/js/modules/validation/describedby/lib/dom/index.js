import { DOTNET_CLASSNAMES, AX_ATTRIBUTES, ACTIONS } from '../constants';

/**
 * Hypertext DOM factory function
 * 
 * @param nodeName [String]
 * @param attributes [Object]
 * @param text [String] The innerText of the new node
 * 
 * @returns node [DOM node]
 * 
 */
export const h = (nodeName, attributes, text) => {
    let node = document.createElement(nodeName);

    for (let prop in attributes) {
        node.setAttribute(prop, attributes[prop]);
    }
    if (text !== undefined && text.length) node.appendChild(document.createTextNode(text));

    return node;
};

/**
 * Creates and appends a text node error message to a  error container DOM node for a group
 * 
 * @param group [Object, vaidation group] 
 * @param msg [String] The error message
 * 
 * @returns node [Text node]
 * 
 */
export const createErrorTextNode = (group, msg) => {
    let node = document.createTextNode(msg);
    group.serverErrorNode.classList.remove(DOTNET_CLASSNAMES.VALID);
    group.serverErrorNode.classList.add(DOTNET_CLASSNAMES.ERROR);
    
    return group.serverErrorNode.appendChild(node);
};

/**
 * Removes the error message, updates .NET MVC error span classNames and deletes the 
 * error from local errors tracking object
 * 
 * Signature () => groupName => state => {}
 * (Curried groupName for ease of use as eventListener and in whole form iteration)
 * 
 * @param groupName [String, vaidation group] 
 * @param state [Object, validation state]
 * 
 */
export const clearError = groupName => state => {
    if (state.groups[groupName].serverErrorNode) {
        state.groups[groupName].serverErrorNode.innerHTML = '';
        state.groups[groupName].serverErrorNode.classList.remove(DOTNET_CLASSNAMES.ERROR);
        state.groups[groupName].serverErrorNode.classList.add(DOTNET_CLASSNAMES.VALID);
    } else {
        state.errors[groupName].parentNode.removeChild(state.errors[groupName]);
    }
    state.groups[groupName].fields.forEach(field => {
        field.parentNode.classList.remove('is--invalid');
        field.removeAttribute('aria-invalid');
        //assuming that the field only has an aria-describedby because of an associated error summary row
        //do we need to add support for fields that have aria-describedby for another reason?
        if (field.hasAttribute('aria-describedby')) field.removeAttribute('aria-describedby');
    });

    if (state.errorSummary) {
        const errorSummaryItem = state.errorSummary.querySelector(`[${AX_ATTRIBUTES.ERROR_MESSAGE}=${groupName}]`);
        if (errorSummaryItem) {
            errorSummaryItem.parentNode.removeChild(errorSummaryItem);
        }
    }
    
    delete state.errors[groupName];//shouldn't be doing this here...
};

/**
 * Iterates over all errors in local scope to remove each error prior to re-validation
 * 
 * @param state [Object, validation state]
 * 
 */
export const clearErrors = state => {
    if (state.errorSummary && state.errorSummary.firstElementChild) state.errorSummary.removeChild(state.errorSummary.firstElementChild);
    state.errors && Object.keys(state.errors).forEach(name => {
        clearError(name)(state);
    });
};

/**
 * Iterates over all groups to render each error post-vaidation
 * 
 * @param state [Object, validation state]
 * 
 */
export const renderErrors = Store => () => {
    const state = Store.getState();
    const render = () => Object.keys(state.groups).forEach(groupName => {
        if (!state.groups[groupName].valid) renderError(Store)(groupName);
    });
    
    if (state.settings.useSummary && !state.errorSummary) createErrorSummary(Store, render);
    else render();
    
};

/**
 * Iterates over all groups to render each error post-vaidation
 * 
 * @param Store [Object]
 * @param cb [Funciton, callback]
 * 
 */
export const createErrorSummary = (Store, cb) => {
    const errorSummary = h('div', { role: 'alert', class: AX_ATTRIBUTES.HIDDEN_CLASS, [AX_ATTRIBUTES.ERROR_SUMMARY]: 'true' } );
    const { form } = Store.getState();
    form.insertBefore(errorSummary, form.firstChild);
    Store.dispatch(ACTIONS.CREATE_ERROR_SUMMARY, errorSummary, [ cb ]);
};

/**
 * Adds an error message to the DOM and saves it to local scope
 * 
 * If .NET MVC error span is present, it is used with a appended textNode,
 * if not a new DOM node is created
 * 
 * Signature () => groupName => state => {}
 * (Curried groupName for ease of use as eventListener and in whole form iteration)
 * 
 * @param groupName [String, validation group] 
 * @param state [Object, validation state]
 * 
 */
export const renderError = Store => (groupName, realtime = false) => {
    const state = Store.getState();

    if (state.errors[groupName]) clearError(groupName)(state);
    
    state.errors[groupName] =
        state.groups[groupName].serverErrorNode
            ? createErrorTextNode(state.groups[groupName], state.groups[groupName].errorMessages[0])
            : document
                .querySelector(`[for="${state.groups[groupName].fields[state.groups[groupName].fields.length-1].getAttribute('id')}"]`)
                .appendChild(
                    h('span', {
                        class: DOTNET_CLASSNAMES.ERROR
                    }, state.groups[groupName].errorMessages[0]),
                    state.groups[groupName].fields[state.groups[groupName].fields.length-1]
                );

    state.groups[groupName].fields.forEach(field => {
        field.parentNode.classList.add('is--invalid');
        field.removeAttribute('aria-invalid');
    });
	
    if (state.errorSummary) renderErrorToSummary(state, groupName, realtime);
    
};

export const renderRealtimeError = Store => groupName => renderError(Store)(groupName, true);

/*
 * This only runs once during initialisation to ensure that the server-side error messages are announced
 * They are only announed if they are appended to the live region summary some time (200ms+) after it is rendered to the DOM.
 * @param state [Object, validation state]
 */
export const renderErrorSummary = Store => state => {
    if (!state.errorSummary && !state.settings.useSummary) return;
    const render = state => window.setTimeout(() => {
        Object.keys(state.groups).forEach(groupName => {
            if (state.groups[groupName].errorMessages && state.groups[groupName].errorMessages.length > 0) renderErrorToSummary(state, groupName);
        });
    }, 200);
    //200ms timeout to ensure that the alert is in the DOM for long enough before the content changes with the error messages
    if (state.settings.useSummary && !state.errorSummary) createErrorSummary(Store, render);
    else render(state);
};

/*
 * Append an error message span (screen readers don't announce ul > li) to the summary live region
 * @param state [Object, validation state]
 * @param groupName [String, identifier (name or data-group attribute)]
 */
export const renderErrorToSummary = (state, groupName, realtime) => {
    const newNode = h('span', { [AX_ATTRIBUTES.ERROR_MESSAGE]: groupName, id: `ax-error-${groupName}` }, state.groups[groupName].errorMessages[0]);
    if (realtime && state.errorSummary.childNodes.length > 0) state.errorSummary.insertBefore(newNode, state.errorSummary.childNodes[0]); 
    else state.errorSummary.appendChild(newNode);
    state.groups[groupName].fields.forEach(field => field.setAttribute('aria-describedby', `ax-error-${groupName}`));
};


/**
 * Set focus on first invalid field after form-level validate()
 * 
 * We can assume that there is a group in an invalid state,
 * and that the group has at least one field
 * 
 * @param groups [Object, validation group slice of state]
 * 
 */
export const focusFirstInvalidField = state => {
    const firstInvalid = Object.keys(state.groups).reduce((acc, curr) => {
        if (!acc && !state.groups[curr].valid) acc = state.groups[curr].fields[0];
        return acc;
    }, false);
    firstInvalid && firstInvalid.focus();
};

/**
 * Creates a hidden field duplicate of a given field, for conferring submit button values
 * 
 * @param source [Node] A submit input/button
 * @param form [Node] A form node
 * 
 */
export const createButtonValueNode = (source, form) => {
    const node = document.createElement('input');
    node.setAttribute('type', 'hidden');
    node.setAttribute('name', source.getAttribute('name'));
    node.setAttribute('value', source.getAttribute('value'));
    return form.appendChild(node);
};

/**
 * Removes the node added in createButtonValueNode
 * 
 * @param node [Node] A hidden input
 * 
 */
export const cleanupButtonValueNode = node => {
    node.parentNode.removeChild(node);
};