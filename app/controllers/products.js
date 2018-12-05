const mongoose = require('mongoose');
const Product = require('../models/product');

exports.getListProducts = (req, res, next) => {
    Product.find()
        .select('_id name price productImage') //chọn những field muốn get thôi
        .exec()
        .then((products) => {
            const response = {
                count: products.length,
                products: products.map((product) => {
                    return {
                        name: product.name,
                        price: product.price,
                        _id: product._id,
                        productImage: product.productImage,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4200/products/' + product._id
                        }
                    }
                })
            }
            res.status(200)
                .json(response);

        })
        .catch((err) => {
            res.status(500).json(err);
        })
}
exports.getProduct = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .select('_id name price productImage')
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
}

exports.createProduct = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.destination + req.file.filename
    });
    product.save()
        .then((result) => {
            res.status(200)
                .json(result);
        }).catch((err) => {
            res.status(500)
                .json(err);
        })
}

exports.editProduct = (req, res, next) => {
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
    //viết cách này để khi update thiếu trường thì những trường khác không thay đổi
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
}

exports.deleteProduct = (req, res, next) => {
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
}