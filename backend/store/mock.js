/**
 * Simple static store for unit test the web server components without making calls to external services
 */

var product = require('../../models/product');

var apple = product('apple', 0.60);
var orange = product('orange', 0.25);

var mockStore = {
    // TODO: build a true index
    products: {
        apple: {price: apple.price, stock: 5},
        orange: {price: orange.price, stock: 4}
    }
}

module.exports = mockStore;