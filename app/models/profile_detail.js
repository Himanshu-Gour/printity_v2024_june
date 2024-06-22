const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// profile_detail Schema

var profile_detail_Schema = new Schema({

    fullName: { type: String },
    gstNumber: { type: String, required: true },
    companyName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    landlineNumber: { type: Number },
    companyAddress: { type: String, required: true },
    companyState: { type: String, required: true },
    companyCity: { type: String, required: true },
    companyZipCode: { type: Number, required: true },
    company_shipping_address: { type: String },
    shipping_state: { type: String },
    shipping_city: { type: String },
    shippingZipCode: { type: Number }





    // fullName: { type: String },
    // gstNumber: { type: String, },
    // companyName: { type: String, },
    // phoneNumber: { type: Number, },
    // landlineNumber: { type: Number },
    // companyAddress: { type: String, },
    // companyState: { type: String, },
    // companyCity: { type: String, },
    // companyZipCode: { type: Number, },
    // company_shipping_address: { type: String },
    // shipping_state: { type: String },
    // shipping_city: { type: String },
    // shippingZipCode: { type: Number }
});

Profile_detail = mongoose.model("profile_details", profile_detail_Schema);
module.exports = Profile_detail;
