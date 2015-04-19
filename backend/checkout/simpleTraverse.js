/**
 * Simple sum cost function
 */

var product = require('../../models/product');

module.exports = function(store, acc, xs) {
    for (var p in xs) {
        acc.add(xs[p]);
    }
    return acc.total;
};
