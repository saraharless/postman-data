const express = require('express');
const mongoose = require('mongoose');
const snacks = require('./models/vending.js');
const bodyParser = require('body-parser');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/allSnacks');

const app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
  snacks.find()
    .then(function(results) {
      res.json({
        status: 'success',
        'data': results
      })
    })
})

app.post('/api/vendor/items', function(req, res) {
  let snack = new snacks({
    title: req.body.title,
    quantity: req.body.quantity,
    cost: req.body.cost,
    bought: req.body.bought
  })
  snack.save().then(function() {
    res.json({
      status: 'success'
    })
  })
})

app.post('/api/customer/items/:itemId/purchases', function(req, res) {
  console.log('this is the current quantity: ' + req.body.quantity);
  console.log('this is the current number bought: ' + req.body.bought);
  snacks.findById('59af012cb016e6b7c87d5bd8', function(err, doc) {
    console.log('this is the doc: ' + doc);
  })
  snacks.update({
      id: '59af012cb016e6b7c87d5bd8'
    }, {
      $inc: {
        // quantity: -1
        {bought: 1
      }
    })
    .then(function() {
      res.json({
        status: 'success'
      })
    })
})

app.listen(3000, function() {
  console.log('you did it, or something');
})

// assignment guidelines:
// add snack
//get a list of all items
//buy an item
