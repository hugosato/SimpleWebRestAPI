/**
 * Simple sum cost function
 */

var product = require('../../models/product');

module.exports = function(store, acc, xs) {
    for (var p in xs) {
        acc.add(store.products[xs[p]].price);
    }
    return acc.total;
};
