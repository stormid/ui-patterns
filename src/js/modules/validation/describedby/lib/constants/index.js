export const TRIGGER_EVENTS = ['click', 'keydown'];

export const KEY_CODES = {
    ENTER: 13
};

export const PREHOOK_DELAY = 16;

export const ACTIONS = {
    SET_INITIAL_STATE: 'SET_INITIAL_STATE',
    CLEAR_ERRORS: 'CLEAR_ERRORS',
    VALIDATION_ERRORS: 'VALIDATION_ERRORS',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    CREATE_ERROR_SUMMARY: 'CREATE_ERROR_SUMMARY',
    ADD_VALIDATION_METHOD: 'ADD_VALIDATION_METHOD',
    ADD_GROUP: 'ADD_GROUP',
    REMOVE_GROUP: 'REMOVE_GROUP'
};

export const AX_ATTRIBUTES = {
    ERROR_SUMMARY: 'data-error-summary',
    ERROR_MESSAGE: 'data-ax-error',
    HIDDEN_CLASS: 'visually-hidden'
};

//https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

//https://mathiasbynens.be/demo/url-regex
export const URL_REGEX = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

export const DATE_ISO_REGEX = /^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/;

export const NUMBER_REGEX = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;

export const DIGITS_REGEX = /^\d+$/;

//data-attribute added to error message span created by .NET MVC
export const DOTNET_ERROR_SPAN_DATA_ATTRIBUTE = 'data-valmsg-for';

//validator parameters that require DOM lookup
export const DOM_SELECTOR_PARAMS = ['remote-additionalfields', 'equalto-other'];

//.NET MVC validator data-attribute parameters indexed by their validators
//e.g. <input data-val-length="Error messge" data-val-length-min="8" data-val-length-max="10" type="text"... />
export const DOTNET_PARAMS = {
    length: ['length-min', 'length-max'],
    stringlength: ['length-max'],
    range: ['range-min', 'range-max'],
    min: ['min-min'],
    max: ['max-max'],
    minlength: ['minlength-min'],
    maxlength: ['maxlength-max'],
    regex: ['regex-pattern'],
    equalto: ['equalto-other'],
    remote: ['remote-url', 'remote-additionalfields', 'remote-type']
};

//.NET MVC data-attributes that identify validators
export const DOTNET_ADAPTORS = [
    'required',
    'stringlength',
    'dateISO',
    'regex',
    'digits',
    'email',
    'number',
    'url',
    'length',
    'min',
    'max',
    'minlength',
    'maxlength',
    'range',
    'equalto',
    // 'password' //-> map to min, nonalphamain, and regex methods
    'remote'//should be last
];

//classNames added/updated on .NET MVC error message span
export const DOTNET_CLASSNAMES = {
    VALID: 'field-validation-valid',
    ERROR: 'error-message'
};

export const GROUP_ATTRIBUTE = 'group';