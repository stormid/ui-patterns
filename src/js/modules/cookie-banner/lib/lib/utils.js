import { FOCUSABLE_ELEMENTS, EVENTS } from './constants';

//Modernizr cookie test
export const cookiesEnabled = () => {
    try {
        document.cookie = 'cookietest=1';
        const ret = document.cookie.indexOf('cookietest=') !== -1;
        document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
        return ret;
    } catch (error) {
        return false;
    }
};

export const writeCookie = state => {
    document.cookie = [
        `${state.settings.name}=${btoa(JSON.stringify({ consent: state.consent, cid: state.persistentMeasurementParams.cid }))};`,
        `expires=${(new Date(new Date().getTime() + (state.settings.expiry*24*60*60*1000))).toGMTString()};`,
        state.settings.path ? `path=${state.settings.path};` : '',
        state.settings.domain ? `domain=${state.settings.domain};` : '',
        state.settings.samesite ? `SameSite=${state.settings.samesite};` : '',
        state.settings.secure ? `secure` : ''
    ].join('');
};

export const readCookie = settings => {
    const cookies = document.cookie.split('; ');
    for (let n = 0; n <= cookies.length; n++) {
        if (!cookies[n]) return false;
        const [ name, value ] = cookies[n].split('=');
        if (name === settings.name) return window.atob(value);
    }
    return false;
};

const updateCookie = state => model => document.cookie = [
    `${model.name}=${model.value};`,
    `expires=${model.expiry};`,
    `path=${state.settings.path};`,
    state.settings.domain ? `domain=${state.settings.domain};` : '',
    state.settings.samesite ? `SameSite=${state.settings.samesite};` : '',
    state.settings.secure ? `secure` : ''
].join('');

export const deleteCookies = state => {
    document.cookie
        .split('; ')
        .map(part => ({
            name: part.split('=')[0],
            value: part.split('=')[1],
            expiry: 'Thu, 01 Jan 1970 00:00:01 GMT'
        }))
        .map(updateCookie(state));
};

//@return array [hasCookie<Boolean>, cid<UUID>, consent<{}>]
export const extractFromCookie = settings => {
    try {
        const cookie = readCookie(settings);
        if (!cookie) return [false, uuidv4(), {}];
        const { cid, consent } = JSON.parse(cookie);
        const hasCookie = consent !== undefined;
        return [hasCookie, cid || uuidv4(), consent || {}];
    } catch (e){
        return [false, uuidv4(), {}];
    }
};

export const composeTypes = opts => (acc, curr) => {
    if (acc[curr]) {
        acc[curr] = Object.assign({}, acc[curr], {
            fns: acc[curr].fns.concat(opts.types[curr].fns),
        });
    }  else acc[curr] = opts.types[curr];
    return acc;
};

export const noop = () => {};

export const isCheckable = field => (/radio|checkbox/i).test(field.type);

const hasValue = input => (input.value !== undefined && input.value !== null && input.value.length > 0);

export const groupValueReducer = (acc, input) => {
    if (!isCheckable(input) && hasValue(input)) acc = input.value;
    if (isCheckable(input) && input.checked) {
        if (Array.isArray(acc)) acc.push(input.value);
        else acc = [input.value];
    }
    return acc;
};

const firstTLDs  = 'ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|be|bf|bg|bh|bi|bj|bm|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|cl|cm|cn|co|cr|cu|cv|cw|cx|cz|de|dj|dk|dm|do|dz|ec|ee|eg|es|et|eu|fi|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|im|in|io|iq|ir|is|it|je|jo|jp|kg|ki|km|kn|kp|kr|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|na|nc|ne|nf|ng|nl|no|nr|nu|nz|om|pa|pe|pf|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|yt'.split('|');
const secondTLDs = 'netlify|azurewebsites|com|edu|gov|net|mil|org|nom|sch|caa|res|off|gob|int|tur|ip6|uri|urn|asn|act|nsw|qld|tas|vic|pro|biz|adm|adv|agr|arq|art|ato|bio|bmd|cim|cng|cnt|ecn|eco|emp|eng|esp|etc|eti|far|fnd|fot|fst|g12|ggf|imb|ind|inf|jor|jus|leg|lel|mat|med|mus|not|ntr|odo|ppg|psc|psi|qsl|rec|slg|srv|teo|tmp|trd|vet|zlg|web|ltd|sld|pol|fin|k12|lib|pri|aip|fie|eun|sci|prd|cci|pvt|mod|idv|rel|sex|gen|nic|abr|bas|cal|cam|emr|fvg|laz|lig|lom|mar|mol|pmn|pug|sar|sic|taa|tos|umb|vao|vda|ven|mie|北海道|和歌山|神奈川|鹿児島|ass|rep|tra|per|ngo|soc|grp|plc|its|air|and|bus|can|ddr|jfk|mad|nrw|nyc|ski|spy|tcm|ulm|usa|war|fhs|vgs|dep|eid|fet|fla|flå|gol|hof|hol|sel|vik|cri|iwi|ing|abo|fam|gok|gon|gop|gos|aid|atm|gsm|sos|elk|waw|est|aca|bar|cpa|jur|law|sec|plo|www|bir|cbg|jar|khv|msk|nov|nsk|ptz|rnd|spb|stv|tom|tsk|udm|vrn|cmw|kms|nkz|snz|pub|fhv|red|ens|nat|rns|rnu|bbs|tel|bel|kep|nhs|dni|fed|isa|nsn|gub|e12|tec|орг|обр|упр|alt|nis|jpn|mex|ath|iki|nid|gda|inc'.split('|');

export const removeSubdomain = s => {
    s = s.replace(/^www\./, '');
    let parts = s.split('.');
    
    while (parts.length > 3) {
        parts.shift();
    }

    if (parts.length === 3 && ((secondTLDs.indexOf(parts[1]) === -1) && firstTLDs.indexOf(parts[2]) === -1)) {
        parts.shift();
    }

    return parts.join('.');
};

export const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

export const getFocusableChildren = node => [].slice.call(node.querySelectorAll(FOCUSABLE_ELEMENTS.join(',')));

export const broadcast = (type, Store) => state => {
    const event = new CustomEvent(type, {
        bubbles: true,
        detail: {
            getState: Store.getState
        }
    });
    window.document.dispatchEvent(event);
};