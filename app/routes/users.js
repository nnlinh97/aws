var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const SHA256 = require("crypto-js/sha256");
const jwt = require('jsonwebtoken');

const User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/signin', function (req, res, next) {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({ message: 'Autn failed' });
            }
            if (SHA256(req.body.password).toString() === user[0].password) {
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    'secret_key',
                    {
                        expiresIn: '1h'
                    }
                )
                return res.status(200).json({ 
                    message: 'Auth successful',
                    token: token
                 })
            }
            res.status(401).json({ message: 'Autn failed' });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        })
});

router.post('/signup', function (req, res, next) {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({ message: 'Mail exists' });
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: SHA256(req.body.password).toString()
                })
                user.save()
                    .then((result) => {
                        res.status(200).json({
                            message: "User created"
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({ error: err });
                    });
            }
        });
});

router.delete('/:id', function (req, res, next) {
    User.remove({ _id: req.params.id })
        .exec()
        .then((result) => {
            res.status(200).json({ message: 'User deleted' });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        })
});

module.exports = router;
