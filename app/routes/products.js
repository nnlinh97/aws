var express = require('express');
var router = express.Router();
const randomstring = require("randomstring");
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const productsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, randomstring.generate()+ '_' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', productsController.getListProducts);
router.get('/:id', productsController.getProduct);
router.post('/', upload.single('productImage'), productsController.createProduct);
router.patch('/:id', productsController.editProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
