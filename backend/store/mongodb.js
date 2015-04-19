/**
 * Simple static store for unit test the web server components without making calls to external services
 */

var product = require('../../models/product');

var mongoDB = {
    // WIP
    products: {}
}

module.exports = mongoDB;