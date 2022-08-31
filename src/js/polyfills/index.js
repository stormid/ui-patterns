require('es6-object-assign').polyfill();
import Promise from 'promise-polyfill';
window.Promise = window.Promise ? window.Promise : Promise;