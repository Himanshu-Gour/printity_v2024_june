const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Product Schema

var ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subname: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  unicode: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // price: {
  //   type: Number,
  //   required: true,
  // },
  // image: {
  //   type: String,
  //   // todo adding image required option
  // },
});

Product = mongoose.model("product", ProductSchema);
module.exports = Product;
