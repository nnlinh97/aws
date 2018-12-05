var express = require('express');
var router = express.Router();
let Food = require('../models/FoofModel')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello I\'m Express' });
});

// router.get('/products', (req, res, next) => {
//   Food.find().limit(10).sort({ name: 1 }).then((foods) => {
//     res.json({
//       result: 'ok',
//       data: foods,
//       message: 'success'
//     })
//   }).catch((err) => {
//     res.json({
//       result: 'failed',
//       data: [],
//       message: err
//     })
//   })
// });
// router.get('/products/:id', (req, res, next) => {
//   Food.find().limit(10).sort({ name: 1 }).then((foods) => {
//     res.json({
//       result: 'ok',
//       data: foods,
//       message: 'success'
//     })
//   }).catch((err) => {
//     res.json({
//       result: 'failed',
//       data: [],
//       message: err
//     })
//   })
// });
// router.post('/products', (req, res, next) => {
//   const newFood = new Food({
//     name: req.body.name,
//     foodDecription: req.body.foodDecription
//   })
//   newFood.save((err) => {
//     if (err) {
//       res.json({
//         result: "failed",
//         data: {},
//         message: err
//       })
//     } else {
//       res.json({
//         result: "ok",
//         data: {
//           name: req.body.name,
//           foodDecription: req.body.foodDecription
//         },
//         message: 'success'
//       })
//     }
//   })
// });

module.exports = router;
