export default (value, fields) => {
    // Adapted from https://github.com/jquery-validation/jquery-validation/blob/master/src/additional/creditcard.js
    // Accept only spaces, digits and dashes
    if (/[^0-9 -]+/.test(value)) return false;
    let cDigit;
    let nCheck = 0;
    let nDigit = 0;
    let bEven = false;
    value = value.replace(/\D/g, '');

    // Basing min and max length on https://dev.ean.com/general-info/valid-card-types/
    if (value.length < 13 || value.length > 19) return false;
    for (let n = value.length - 1; n >= 0; n--) {
        cDigit = value.charAt(n);
        nDigit = parseInt(cDigit, 10);
        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }
        nCheck += nDigit;
        bEven = !bEven;
    }
    return nCheck % 10 === 0;
};