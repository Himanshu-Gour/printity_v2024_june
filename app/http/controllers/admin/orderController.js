const title_Congif = require("../../../config/title_config");
const description_Congif = require("../../../config/description_config");
const keyword_config = require("../../../config/keyword_config");

const order = require("../../../models/order")
const Order = require('../../../models/order')

function orderController() {
    return {
        index(req, res) {
            order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).populate('customerId', '-password').exec((err, orders) => {
                if (req.xhr) {
                    return res.json(orders)
                } else {
                    return res.render('admin/orders', {
                        title: title_Congif().admin_order,
                        description: description_Congif().admin_order,
                        keyword: keyword_config().admin_order,
                    })
                }
            })
        }
    }
}

module.exports = orderController