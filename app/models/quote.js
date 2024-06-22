const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true


    },
    quote: { type: Object, required: true },
    rate: { type: Number, default: 0 },
    status: { type: String, default: "order_not_placed" }
}, { timestamps: true });



module.exports = mongoose.model("Quote", quoteSchema);
