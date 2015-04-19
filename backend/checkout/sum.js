/**
 * Simple sum accumulator
 */

var product = require('../../models/product');
var traverse = require('./simpleTraverse');

module.exports = function(store, xs) {
    var acc = {
        total: 0,
        add: function(x) {
            this.total += store.products[x].price;
        }
    };
    traverse(store, acc, xs);
    return acc.total;
};