const Order = require('../models/order');

exports.getListOrders = (req, res, next) => {
    Order.find()
        .populate('product', 'name price') //match với collection products nhưng chỉ lấy thêm name, price
        .select('_id product quantity') //chọn những field muốn get thôi
        .exec()
        .then((orders) => {
            res.status(200)
                .json({
                    count: orders.length,
                    orders: orders
                });

        })
        .catch((err) => {
            res.status(500).json(err);
        })
}