const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product_category_Schema = new Schema({
  name: { type: String, required: true },
  types: [{ name: String, subname: String }],
});

category = mongoose.model("category", product_category_Schema);

module.exports = category;
