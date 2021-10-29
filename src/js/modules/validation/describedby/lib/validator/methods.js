import {
    EMAIL_REGEX,
    URL_REGEX,
    DATE_ISO_REGEX,
    NUMBER_REGEX,
    DIGITS_REGEX
} from '../constants';
import {
    fetch,
    isRequired,
    extractValueFromGroup,
    resolveGetParams
} from './utils';

const isOptional = group => !isRequired(group) && extractValueFromGroup(group) === '';

const extractValidationParams = (group, type) => group.validators.filter(validator => validator.type === type)[0].params;

const regexMethod = regex => group => isOptional(group)|| group.fields.reduce((acc, input) => (acc = regex.test(input.value), acc), false);

const paramMethod = (type, reducer) => group => isOptional(group) || group.fields.reduce(reducer(extractValidationParams(group, type)), false);

const shouldValidateByParam = param => param !== undefined;

export default {
    required: group => extractValueFromGroup(group) !== '',
    email: regexMethod(EMAIL_REGEX),
    url: regexMethod(URL_REGEX),
    dateISO: regexMethod(DATE_ISO_REGEX),
    number: regexMethod(NUMBER_REGEX),
    digits: regexMethod(DIGITS_REGEX),
    minlength: paramMethod(
        'minlength',
        params => (acc, input) => (acc = +input.value.length >= +params.min, acc)
    ),
    maxlength: paramMethod(
        'maxlength',
        params => (acc, input) => (acc = +input.value.length <= +params.max, acc)
    ),
    equalto: paramMethod('equalto', params => (acc, input) => (acc = params.other.reduce((subgroupAcc, subgroup) => {
        if (extractValueFromGroup(subgroup) !== input.value) subgroupAcc = false;
        return subgroupAcc;
    }, true), acc)),
    pattern: paramMethod('pattern', params => (acc, input) => (acc = RegExp(params.regex).test(input.value), acc)),
    regex: paramMethod('regex', params => (acc, input) => (acc = RegExp(params.pattern).test(input.value), acc)),
    min: paramMethod('min', params => (acc, input) => (acc = !isNaN(parseInt(input.value, 10)) && +input.value >= +params.min, acc)),
    max: paramMethod('max', params => (acc, input) => (acc = !isNaN(parseInt(input.value, 10)) && +input.value <= +params.max, acc)),
    stringlength: paramMethod('stringlength', params => (acc, input) => (acc = +input.value.length <= +params.max, acc)),
    length: paramMethod('length', params => (acc, input) => (acc = (+input.value.length >= +params.min && (params.max === undefined || +input.value.length <= +params.max)), acc)),
    range: paramMethod('range', params => (acc, input) => (acc = ((!shouldValidateByParam(params.min) || +input.value >= +params.min) && (!shouldValidateByParam(params.max) || +input.value <= +params.max)), acc)),
    remote: (group, params) => new Promise((resolve, reject) => {
        const value = extractValueFromGroup(group);
        fetch((params.type !== 'get' ? params.url : `${params.url}?${group.fields[0].name}=${value}&${resolveGetParams(params.additionalfields)}`), {
            method: params.type && params.type.toUpperCase() || 'POST',
            body: params.type !== 'get'
                ? JSON.stringify({ [group.fields[0].name]: value })
                : resolveGetParams(params.additionalfields),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        })
            .then(data => resolve(data));
    }),
    custom: (method, group) => isOptional(group)|| method(extractValueFromGroup(group), group.fields)
};