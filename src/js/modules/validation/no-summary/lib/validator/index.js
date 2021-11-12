import methods from './methods';
import {
    isCheckable,
    isSelect,
    isFile,
    isHidden,
    domNodesFromCommaList,
    groupIsDisabled,
    findErrors,
    groupIsAllHidden,
    addErrorMessageToGroup,
    hasNoValidate
} from './utils';
import {
    DOTNET_ADAPTORS,
    DOTNET_PARAMS,
    DOTNET_ERROR_SPAN_DATA_ATTRIBUTE,
    DOM_SELECTOR_PARAMS,
    GROUP_ATTRIBUTE
} from '../constants';

/**
 * Resolve validation parameter to a string or array of DOM nodes
 * 
 * @param param [String] identifier for the data-attribute `data-val-${param}`
 * @param input [DOM node] the node which contains the data-val- attribute
 * 
 * @return validation param [Object] indexed by second part of param name (e.g., 'min' part of length-min') and array of DOM nodes or a string
 */
export const resolveParam = (param, input) => {
    let value = input.getAttribute(`data-val-${param}`);
    return ({
        [param.split('-')[1]]: ~DOM_SELECTOR_PARAMS.indexOf(param) ? domNodesFromCommaList(value, input): value
    });
};

/**
 * Looks up the data-val property against the known .NET MVC adaptors/validation method
 * runs the matches against the node to find param values, and returns an Object containing all  parameters for that adaptor/validation method
 * 
 * @param input [DOM node] the node on which to look for matching adaptors
 * @param adaptor [String] .NET MVC data-attribute that identifies validator
 * 
 * @return validation params [Object] Validation param object containing all validation parameters for an adaptor/validation method
 */
export const extractParams = (input, adaptor) => DOTNET_PARAMS[adaptor]
    ? {
        params: DOTNET_PARAMS[adaptor]
            .reduce((acc, param) => input.hasAttribute(`data-val-${param}`) ? Object.assign(acc, resolveParam(param, input)) : acc, {})
    }
    : false;

/**
 * Reducer that takes all known .NET MVC adaptors (data-attributes that specify a validation method that should be applied to the node)
 * and checks against a DOM node for matches, returning an array of validators
 * 
 * @param input [DOM node]
 * 
 * @return validators [Array], each validator compposed of 
 *                              type [String] naming the validator and matching it to validation method function
 *                              message [String] the error message displayed if the validation method returns false
 *                              params [Object] (optional) 
 */
export const extractDataValValidators = input => DOTNET_ADAPTORS.reduce((validators, adaptor) =>
    !input.getAttribute(`data-val-${adaptor}`)
        ? validators
        : [...validators,
            Object.assign({
                type: adaptor,
                message: input.getAttribute(`data-val-${adaptor}`) },
            extractParams(input, adaptor)
            )
        ],
[]);

/**
 * Looks for a data-val attribute matching the validator type and returns the value
 * 
 * @param input [DOM node]
 * @param type [String]
 * 
 * @return [Object] Error message or empty
 */
const resolveMessages = (input, type) => input.getAttribute(`data-val-${type}`) ? { message: input.getAttribute(`data-val-${type}`) } : {};

/**
 * Checks attributes on an input to generate an array of validators the attributes describe
 * 
 * @param input [DOM node]
 * 
 * @return validators [Array]
 */
export const extractAttrValidators = input => {
    let validators = [];
    if ((input.hasAttribute('required') || input.hasAttribute('aria-required')) && (input.getAttribute('required') !== 'false' || input.getAttribute('aria-required') !== 'false')){
        validators.push({ type: 'required', ...resolveMessages(input, 'required') } );
    }
    if (input.getAttribute('type') === 'email') validators.push({ type: 'email', ...resolveMessages(input, 'email') });
    if (input.getAttribute('type') === 'url') validators.push({ type: 'url', ...resolveMessages(input, 'url') });
    if (input.getAttribute('type') === 'number') validators.push({ type: 'number', ...resolveMessages(input, 'number') });
    if ((input.getAttribute('minlength') && input.getAttribute('minlength') !== 'false')){
        validators.push({ type: 'minlength', params: { min: input.getAttribute('minlength') }, ...resolveMessages(input, 'minlength') });
    }
    if ((input.getAttribute('maxlength') && input.getAttribute('maxlength') !== 'false')){
        validators.push({ type: 'maxlength', params: { max: input.getAttribute('maxlength') }, ...resolveMessages(input, 'maxlength') });
    }
    if ((input.getAttribute('min') && input.getAttribute('min') !== 'false')){
        validators.push({ type: 'min', params: { min: input.getAttribute('min') }, ...resolveMessages(input, 'min') });
    }
    if ((input.getAttribute('max') && input.getAttribute('max') !== 'false')){
        validators.push({ type: 'max', params: { max: input.getAttribute('max') }, ...resolveMessages(input, 'max') });
    }
    if ((input.getAttribute('pattern') && input.getAttribute('pattern') !== 'false')){
        validators.push({ type: 'pattern', params: { regex: input.getAttribute('pattern') }, ...resolveMessages(input, 'pattern') });
    }
    return validators;
};

/**
 * Validator checks to extract validators based on HTML5 attributes
 * 
 * Each function is curried so we can seed each fn with an input and pipe the result array through each function
 * Signature: inputDOMNode => validatorArray => updateValidatorArray

const required = input => (validators = []) => {
    // console.log(validators);
    return input.hasAttribute('required') && input.getAttribute('required') !== 'false' ? [...validators, {type: 'required'}] : validators;
};
const email = input => (validators = [])  => input.getAttribute('type') === 'email' ? [...validators, {type: 'email'}] : validators;
const url = input => (validators = [])  => input.getAttribute('type') === 'url' ? [...validators, {type: 'url'}] : validators;
const number = input => (validators = [])  => input.getAttribute('type') === 'number' ? [...validators, {type: 'number'}] : validators;
const minlength = input => (validators = [])  => (input.getAttribute('minlength') && input.getAttribute('minlength') !== 'false') ? [...validators, {type: 'minlength', params: { min: input.getAttribute('minlength')}}] : validators;
const maxlength = input => (validators = [])  => (input.getAttribute('maxlength') && input.getAttribute('maxlength') !== 'false') ? [...validators, {type: 'maxlength', params: { max: input.getAttribute('maxlength')}}] : validators;
const min = input => (validators = [])  => (input.getAttribute('min') && input.getAttribute('min') !== 'false') ? [...validators, {type: 'min', params: { min: input.getAttribute('min')}}] : validators;
const max = input => (validators = [])  => (input.getAttribute('max') && input.getAttribute('max') !== 'false') ? [...validators, {type: 'max', params: { max: input.getAttribute('max')}}] : validators;
const pattern = input => (validators = [])  => (input.getAttribute('pattern') && input.getAttribute('pattern') !== 'false') ? [...validators, {type: 'pattern', params: { regex: input.getAttribute('pattern')}}] : validators;
 */

/**
 * Takes an input and returns the array of validators based on either .NET MVC data-val- or HTML5 attributes
 * 
 * @param input [DOM node]
 * 
 * @return validators [Array]
 */
export const normaliseValidators = input => input.getAttribute('data-val') === 'true'
    ? extractDataValValidators(input)
    : extractAttrValidators(input);

/**
 * Calls a validation method against an input group
 * 
 * @param group [Array] DOM nodes with the same name attribute
 * @param validator [String] The type of validator matching it to validation method function
 * 
 * @returns validityState [Boolean]
 * 
 */
export const validate = (group, validator) => validator.type === 'custom'
    ? methods.custom(validator.method, group)
    : methods[validator.type](group, validator.params);

/**
 * Reducer constructing an validation Object for a group of DOM nodes
 * 
 * @param input [DOM node]
 * 
 * @returns validation object [Object] consisting of
 *                            valid [Boolean] the validityState of the group
 *                            validators [Array] of validator objects
 *                            fields [Array] DOM nodes in the group
 *                            serverErrorNode [DOM node] .NET MVC server-rendered error message span
 * 
 */
export const assembleValidationGroup = (acc, input) => {
    let name = (input.getAttribute('data-val-'+GROUP_ATTRIBUTE)) ? input.getAttribute('data-val-'+GROUP_ATTRIBUTE) : input.getAttribute('name') ;
    if (!name) return console.warn('Missing data group or name attribute'), acc;

    if (acc[name] && isHidden(input)) return acc;
    
    return acc[name] = acc[name] ? Object.assign(acc[name], { fields: [...acc[name].fields, input] })
        : {
            valid: false,
            validators: normaliseValidators(input),
            fields: [input],
            serverErrorNode: document.querySelector(`[${DOTNET_ERROR_SPAN_DATA_ATTRIBUTE}="${name}"]`) || false
        }, acc;
};

/**
 * Returns an error message property of the validator Object that has returned false or the corresponding default message
 * 
 * @param validator [Object] 
 * 
 * @return message [String] error message
 * 
 */
export const extractErrorMessage = (messages, validator) => validator.message || messages[validator.type](validator.params !== undefined ? validator.params : null);

/**
 * Curried function that returns a reducer that reduces the resolved response from an array of validation Promises performed against a group
 * into an array of error messages or an empty array
 * 
 * @return error messages [Array]
 * 
 */
export const reduceErrorMessages = (group, state) => (acc, validity, j) => validity === true
    ? acc
    : [...acc, typeof validity === 'boolean'
        ? extractErrorMessage(state.settings.messages, state.groups[group].validators[j])
        : validity];

/**
 * From all groups found in the current form, thosethat do not require validation (have no assocated validators) are removed
 * 
 * @param groups [Object] name-indexed object consisting of all groups found in the current form
 * 
 * @return groups [Object] name-indexed object consisting of all validatable groups
 * 
 */
export const removeUnvalidatableGroups = groups => {
    let validationGroups = {};

    for (let group in groups){
        if (groups[group].validators.length > 0 && !groupIsAllHidden(groups[group].fields)){
            validationGroups[group] = groups[group];
        }
    }
    return validationGroups;
};

/**
 * Takes a form DOM node and returns the initial form validation state - an object consisting of all the validatable input groups
 * with validityState, fields, validators, and associated data required to perform validation and render errors.
 * 
 * @param form [DOM nodes] 
 * 
 * @return state [Object] consisting of groups [Object] name-indexed validation groups
 * 
 */
export const getInitialState = (form, settings) => {
    const groups = removeUnvalidatableGroups([].slice.call(form.querySelectorAll('input:not([type=submit]), textarea, select'))
        .reduce(assembleValidationGroup, {}));
    const errors = findErrors(groups);
    return {
        form,
        settings,
        errors,
        realTimeValidation: false,
        groups: errors ? addErrorMessageToGroup(groups, errors) : groups
    };
};

/**
 * Reducer run against an array of resolved validation promises to set the overall validityState of a group
 * 
 * @return validityState [Boolean] 
 * 
 */
export const reduceGroupValidityState = (acc, curr) => {
    if (curr !== true) acc = false;
    return acc;
};


export const isFormValid = validityState => [].concat(...validityState).reduce(reduceGroupValidityState, true);

/**
 * Aggregates validation promises for all groups into a single promise
 * 
 * @params groups [Object]
 * 
 * @return validation results [Promise] aggregated promise
 * 
 */
export const getValidityState = groups => Promise.all(
    Object.keys(groups)
        .map(group => getGroupValidityState(groups[group]))
);

/**
 * Aggregates all of the validation promises for a single group into a single promise
 * 
 * @params groups [Object]
 * 
 * @return validation results [Promise] aggregated promise
 * 
 */
export const getGroupValidityState = group => {
    let hasError = false;
    //check if group is disabled
    if (groupIsDisabled(group.fields)) return Promise.resolve([true]);
    return Promise.all(group.validators.map(validator => new Promise((resolve, reject) => {
        if (validator.type !== 'remote'){
            if (validate(group, validator)) resolve(true);
            else {
                hasError = true;
                resolve(false);
            }
        } else if (hasError) resolve(false);
        else {
            validate(group, validator)
                .then(res => {
                    if (res === 'true') resolve(true);
                    if (res === 'false') resolve(false);
                    resolve(res);
                })
                .catch(err => console.warn(err));
        }
    })));
};

/**
 * Determines the event type to be used for real-time validation a given field based on field type
 * 
 * @params input [DOM node]
 * 
 * @return event type [String]
 * 
 */
export const resolveRealTimeValidationEvent = input => ['input', 'change'][Number(isCheckable(input) || isSelect(input) || isFile(input))];