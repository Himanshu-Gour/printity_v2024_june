const category = require("../../../models/category");
const Product = require("../../../models/products");
const Profile_detail = require("../../../models/profile_detail");
const description_Congif = require("../../../config/description_config");
const keyword_config = require("../../../config/keyword_config");
const title_Congif = require("../../../config/title_config");
const express = require("express");
const { response, json } = require("express");
const user = require("../../../models/user");
const Order = require("../../../models/order");
const Quote = require("../../../models/quote");
const moment = require("moment");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { nanoid } = require('nanoid');

function checkUserDir(userId) {
  // console.log("Running checkUserDir and user id is: ", userId);
  if (!fs.existsSync(`${appRoot}/uploads/${userId}`)) {
    fs.mkdir(`${appRoot}/uploads/${userId}`, function (err) {
      if (err) {
        console.log(err.message);
      }

    });
    return true;
  } else {
    return 'Directory Already Exists'
  }
}

function createQuoteDirectory(userId, randomToken) {
  fs.mkdir(`${appRoot}/uploads/${userId}/${randomToken}`, function (err) {
    if (err) {
      console.log(err.message);
    }

  });
}

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // console.log("File Extension: ", path.extname(file.originalname));
    const { _id } = req.user;
    await checkUserDir(_id);
    await createQuoteDirectory(_id, req.params.randomToken)
    cb(null, `uploads/${_id}/${req.params.randomToken}/`);
  },
  // filename: (req, file, cb) => {
  //   // console.log(file);
  //   const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
  //   cb(null, uniqueName);
  // },
  filename: (req, file, cb) => cb(null, file.originalname)

});

const handleMultepartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5000 },
}).array("designs", 15);

function customerController() {
  return {
    profile(req, res) {
      res.render("profile", {
        title: title_Congif().profile,
        description: description_Congif().profile,
        keyword: keyword_config().profile,
      });
    },
    profile_post(req, res) {
      const {
        fullName,
        gstNumber,
        companyName,
        phoneNumber,
        landlineNumber,
        companyAddress,
        companyCity,
        companyZipCode,
        company_shipping_address,
        shipping_state,
        shipping_city,
        shippingZipCode,
      } = req.body;
      // Create a profile detail
      const user_id = req.user._id;
      const profile_detail = new Profile_detail({


        _id: user_id,
        fullName: fullName,
        gstNumber: gstNumber,
        companyName: companyName,
        phoneNumber: phoneNumber,
        landlineNumber: landlineNumber,
        companyAddress: companyAddress,
        companyState: companyState,
        companyCity: companyCity,
        companyZipCode: companyZipCode,
        company_shipping_address: company_shipping_address,
        shipping_state: shipping_state,
        shipping_city: shipping_city,
        shippingZipCode: shippingZipCode,
      });
      profile_detail.save((err, doc) => {
        if (!err) {
          // console.log("sucess");
          // console.log(profile_detail);
        } else {
          console.log(err);
          return res.redirect("/profile");
        }
      });
    },
    async dashboard(req, res) {
      let body = req.body;

      if (!req.user) {
        res.render("dashboard", {
          moment: moment,
          title: title_Congif().dashboard,
          description: description_Congif().dashboard,
          keyword: keyword_config().dashboard,
        });
      } else {
        let orders = await Order.find({ customerId: req.user._id, status: { $ne: "completed" } }, null, {
          sort: { createdAt: -1 },
        });
        let completedOrders = await Order.find({ customerId: req.user._id, status: "completed" }, null, {
          sort: { createdAt: -1 },
        });
        let quotes = await Quote.find({ customerId: req.user._id, status: { $eq: "order_not_placed" } }, null, {
          sort: { createdAt: -1 },
        });
        res.render("dashboard", {
          orders: orders,
          quotes: quotes,
          completedOrders: completedOrders,
          moment: moment,
          title: title_Congif().dashboard,
          description: description_Congif().dashboard,
          keyword: keyword_config().dashboard,
        });
      }
    },
    async delete_quote(req, res) {
      try {
        await Quote.updateOne({ _id: req.params.id }, { status: 'quote_deleted' })
        req.flash('success', 'Quoted successfully')
        res.redirect('/dashboard');
      } catch (error) {
        console.log('Error in quote delete :' + error);
        req.flash("error", "Something went wrong");
      }
    },
    cart_update(req, res) {

      const quote = new Quote({
        customerId: req.user._id,
        quote: req.body,
      });

      quote
        .save()
        .then((quote) => {
          // do nothing for now
          // console.log()
          // const userDir = checkUserDir(req.user._id);
          // console.log("USER DIR: ", userDir);
          // if (userDir) {
          //   checkQuoteDir(req.user._id, quote._id);
          // }
          // console.log(quote);

        })
        .catch((err) => {
          console.log(err);
          req.flash("error", "Something went wrong");
        });

      return res.redirect("/login");
    },
    sitemap(req, res) {
      res.render("sitemap.xml", {
        title: title_Congif().sitemap,
        description: description_Congif().sitemap,
        keyword: keyword_config().sitemap,
      });
    },
    async catlog(req, res) {
      const product_category = await category.find();
      const product_detail = await Product.find();
      return res.render("customer/catlog", {
        category: product_category,
        product: product_detail,
        title: title_Congif().catlog,
        description: description_Congif().catlog,
        keyword: keyword_config().catlog,
      });
    },
    categoryname(req, res, next) {
      // let categoryname = JSON.stringify(req.params);
      res.redirect("/products");
    },
    async product(req, res) {
      const product_detail = await Product.find({
        unicode: req.params.productname, // category: req.params.productcategory,
      });

      res.render("customer/product", {
        randomToken: nanoid(16),
        title: ` ${product_detail[0].title} | ` + title_Congif().products,
        description:
          ` ${product_detail[0].title} | ` + description_Congif().products,
        keyword: ` ${product_detail[0].title} , ` + keyword_config().products,
        detail: product_detail,
      });
    },
    industries(req, res) {
      res.render("customer/industries", {
        title: title_Congif().industries,
        description: description_Congif().industries,
        keyword: keyword_config().industries,
      });
    },
    services(req, res) {
      res.render("customer/services", {
        title: title_Congif().services,
        description: description_Congif().services,
        keyword: keyword_config().services,
      });
    },
    async PostProducts(req, res) {
      await handleMultepartData(req, res, (err) => {
        if (err) {
          console.log(err.message);
          req.flash('error', 'Internal error, please retry')
          return res.redirect(`/products/${req.params.productcategory}/${req.params.productunicode}`);
        }
        req.flash('success', 'Quote request succesful!');
        res.redirect('/dashboard');
      });
    },
  };
}

module.exports = customerController;
