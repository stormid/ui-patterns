import factory from './lib/factory';
import defaults from './lib/defaults';

export default (candidate, opts) => {
    let els;
	
    //if we think candidate is a form DOM node, pass it in an Array
    //otherwise convert candidate to an array of Nodes using it as a DOM query 
    if (typeof candidate !== 'string' && candidate.nodeName && candidate.nodeName === 'FORM') els = [candidate];
    else els = [].slice.call(document.querySelectorAll(candidate));
	
    return els.reduce((acc, el) => {
        if (!el.hasAttribute('novalidate')) {
            acc.push(Object.create(factory(el, { ...defaults, ...opts })));
            el.setAttribute('novalidate', 'novalidate');
        }
        return acc;
    }, []);

};