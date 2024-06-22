const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: { type: Object, required: true },
    phone: { type: String, required: true },
    quote_id: { type: String, required: true },
    couponCode: { type: String, required: false },
    address: { type: String, required: true },
    rate: { type: Number, required: true },
    // todo update paymnt type to online payment
    payment_type: { type: String, default: "COD" },
    status: { type: String, default: "order_placed" },
}, { timestamps: true });



module.exports = mongoose.model("Order", orderSchema);
