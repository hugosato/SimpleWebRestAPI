/**
 * A factory for a checkout interface
 */

var checkout = function(promotionCode) {
    return require('./checkout/sum');
};

module.exports = checkout;
