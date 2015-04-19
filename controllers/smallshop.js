var express = require('express');
var smallshop = express.Router();

// TODO: inject environment at runtime
var store = require('../backend/store')('test');
// TODO: make promotion code part of request filter
var checkout = require('../backend/checkout')('simple');

smallshop.get('/', function(req, res, next) {
  res.render('index', { title: 'Smallshop', msg: 'Welcome to smallshop' });
});

smallshop.get('/product', function(req, res, next) {
  res.json(store.products);
});

smallshop.get('/product/:id', function(req, res, next) {
  var storedProduct = store.products[req.params.id];
  if (storedProduct) {
    res.json(storedProduct);
  } else {
    res.status(404).send('unknown product: ' + req.params.id);
  }
});

smallshop.get('/total', function(req, res, next) {
    var cart = req.query.cart;
    if (cart) {
        var total = checkout(store, cart);
        res.json(total);
    } else {
        res.status(400).send('Missing \"cart\" param in querystring');
    }

});

module.exports = smallshop;
