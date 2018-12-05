var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const Product = require('../models/product');
const Order = require('../models/order');
const OrdersController = require('../controllers/orders');

router.get('/', OrdersController.getListOrders);

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .select('_id name price')
        .exec()
        .then((product) => {
            if (product) {
                res.status(200)
                    .json(product);
            } else {
                res.status(404)
                    .json({
                        message: 'no valid entry found',
                    })
            }
        })
        .catch((err) => {
            res.status(500)
                .json(err);
        })
});

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                })
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })
            return order.save();
        })
        .then((result) => {
            res.status(200).json({
                message: 'created order',
                createdOder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });

});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    // const item = {
    //     name: req.body.name,
    //     price: req.body.price
    // }
    // Product.update({_id: id}, {$set: item})


    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    let arrRequest = [];
    for (let i = 0; i < keys.length; i++) {
        let item = {
            "propName": keys[i],
            "value": values[i]
        }
        arrRequest.push(item);
    }

    const updateOps = {}; // giống cái trên nhưng viết cách khác thôi
    for (const ops of arrRequest) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.remove({ _id: id })
        .exec()
        .then((result) => {
            res.status(200)
                .json(result)
        })
        .catch((err) => {
            res.status(500)
                .json(err);
        });
});


module.exports = router;
