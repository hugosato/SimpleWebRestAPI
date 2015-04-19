/**
 * Factory of ADT representing a product with retail price
 */

var product = function(n, p) {
    return { name: n, price: p };
};

module.exports = product;