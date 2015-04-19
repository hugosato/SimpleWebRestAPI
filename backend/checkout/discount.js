/**
 * Simple promotions like:
 * buy one, get one free on Apple
 * 3 for the price of 2 on Oranges
 **/
var debug = require('debug')('SimpleWebRestAPI:checkout');
var product = require('../../models/product');
var traverse = require('./simpleTraverse');

module.exports = function(store, xs) {
    var discountOnOranges = {
        total: 0,
        nOranges: 0,
        add: function(x) {
            debug('Adding ' + x);
            if (x === 'orange') {
                this.nOranges += 1;
                this.total += store.products[x].price;
            } else {
                this.total += store.products[x].price;
            }
            debug('Total:' + this.total);
        },
        final: function() {
            debug('Oranges:' + this.nOranges);
            var discount = Math.floor(this.nOranges / 3) * store.products.orange.price;
            debug('Discount:' + discount);
            debug('Total:' + this.total);
            return this.total - discount;
        }

    };
    traverse(store, discountOnOranges, xs);
    return discountOnOranges.final();
};