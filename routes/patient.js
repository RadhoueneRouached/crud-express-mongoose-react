var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Patient = require('../models/Patient.js');

/* GET ALL PATIENTS */
router.get('/', function(req, res, next) {
  Patient.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE PATIENT BY ID */
router.get('/:id', function(req, res, next) {
  Patient.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE PATIENT */
router.post('/', function(req, res, next) {
  Patient.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE PATIENT */
router.put('/:id', function(req, res, next) {
  Patient.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PATIENT */
router.delete('/:id', function(req, res, next) {
  Patient.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
