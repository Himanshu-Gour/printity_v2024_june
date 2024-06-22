const { json } = require("express");
const title_Congif = require("../../../config/title_config");
const description_Congif = require("../../../config/description_config");
const keyword_config = require("../../../config/keyword_config");
const Order = require("../../../models/order")
const Quote = require("../../../models/quote")
const moment = require("moment")


function orderController() {
    return {
        async index(req, res) {
            if (!req.user) {
                res.render("customer/orders", {
                    moment: moment,
                    title: title_Congif().customer_orders,
                    description: description_Congif().customer_orders,
                    keyword: keyword_config().customer_orders,
                });
            } else {
                orders = await Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } })
                res.header('Cache-Control', 'no-cache, private, no-store,must-revalidate,post-check=0 ,pre-check=0')
                res.render("customer/orders", {
                    orders: orders,
                    moment: moment,
                    title: title_Congif().customer_orders,
                    description: description_Congif().customer_orders,
                    keyword: keyword_config().customer_orders,
                });
            }
        },
        async store(req, res) {

            // let quote_id = req.body.QuoteId





            let quote_id = req.body.QuoteId;
            let quote_item = { quote_id };
            // for quote id 
            for (const [key, value] of Object.entries(quote_item)) {
                if (value !== undefined) {
                    let quote_id = value
                    final_quote_id = quote_id
                }
            }



            quotes = await Quote.findOne({ _id: final_quote_id });



            const { phone, address, couponCode } = req.body

            if (!phone || !address) {
                req.flash("error ", "all fields are reqired")
                return res.redirect("/dashboard")
            }

            const order = new Order({
                customerId: req.user._id,
                product: quotes.quote,
                rate: quotes.rate,
                quote_id: final_quote_id,
                phone,
                address,
                couponCode
            })

            order.save().then(result => {
                Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
                    req.flash('success', 'Order placed successfully')
                    // Emit
                    const eventEmitter = req.app.get('eventEmitter')
                    eventEmitter.emit('orderPlaced', placedOrder)
                    return res.redirect("/orders")
                })
            }).catch(err => {
                req.flash('error', 'something went wrong')
                console.log(err)
                return res.redirect("/dashboard")
            })

            try {
                await Quote.updateOne({ _id: final_quote_id }, { status: 'order_placed' })
                req.flash('success', 'Quoted successfully')
            } catch (error) {
                console.log(error)
                req.flash('fail', 'Something went wrong')
                return res.redirect("/admin/quotes");
            }


        },
        async show(req, res) {
            // const order = await Order.findById(req.params.id)
            const order = await Order.findById(req.params.id)
            // console.log(order)
            // Authorize user
            if (req.user._id.toString() === order.customerId.toString()) {
                return res.render('customer/singleOrder', {
                    layout: "customer/singleOrder",
                    moment,
                    order,
                    title: ` ${order.product.job_name.toUpperCase()}   ` + title_Congif().singleOrder,
                    description: ` ${order.product.job_name.toUpperCase()}   ` + description_Congif().singleOrder,
                    keyword: keyword_config().singleOrder,
                })
            }
            if (req.user.role == "admin") {
                return res.render('customer/singleOrder', {
                    layout: "customer/singleOrder",
                    moment,
                    order,
                    title: ` ${order.product.job_name.toUpperCase()}   ` + title_Congif().singleOrder,
                    description: ` ${order.product.job_name.toUpperCase()}   ` + description_Congif().singleOrder,
                    keyword: keyword_config().singleOrder,
                })
            }
            return res.redirect('/')
        }
    };
}

module.exports = orderController;

// for order tab contoller is in dashboad customer controlller