import defaults from './lib/defaults';
import factory from './lib/factory';
import { composeTypes } from './lib/utils';

export default opts => factory(Object.assign({}, defaults, opts, {
    types: Object.keys(opts.types).reduce(composeTypes(opts), defaults.types)
}));