/**
 * A factory for a store interface
 */

var store = function(env) {
    if (env === 'production') {
        return require('./store/mongodb');
    }
    if (env === 'test') {
        return require('./store/mock');
    }
    throw "Invalid runtime environment: " + env;
};

module.exports = store;