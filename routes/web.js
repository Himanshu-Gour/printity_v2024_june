const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const policyController = require("../app/http/controllers/customerController/policyController");
const customerController = require("../app/http/controllers/customerController/customerController");
const orderController = require("../app/http/controllers/customerController/orderController");
const AdminOrderController = require("../app/http/controllers/admin/orderController");
const AdminQuotesController = require("../app/http/controllers/admin/quoteController");
const statusController = require("../app/http/controllers/admin/statusController");


// Middlewares
// todo working on guest vd 7
const guest = require("../app/http/middlewares/guest");
const auth = require("../app/http/middlewares/auth");
const admin = require("../app/http/middlewares/admin");

function initRoutes(app) {
  // intialization of router
  const express = require("express");


  // homeController


  app.get("/", homeController().index);

  // authController

  app.get("/login", guest, authController().login);

  app.get("/signup", guest, authController().signup);

  app.post("/login", authController().Postlogin);

  app.post("/signup", authController().Postsignup);

  app.post("/logout", authController().logout);
  // policyController

  app.get("/privacy-policy", policyController().privacy_policy);

  app.get("/refund-policy", policyController().refund_policy);

  app.get("/terms-conditions", policyController().terms_conditions);

  // customerController

  app.get("/sitemap", customerController().sitemap);



  app.get("/products", customerController().catlog);
  app.get("/products/:productcategory/:productname", customerController().product);
  app.post("/uploads/:randomToken/:productcategory/:productunicode", customerController().PostProducts);



  // app.get("/industries", customerController().industries);

  // app.get("/services", customerController().services);

  app.get("/profile", customerController().profile);
  app.post("/profile", customerController().profile_post);

  app.get("/dashboard", customerController().dashboard);

  // cart routes 
  app.post("/update-cart", customerController().cart_update);
  app.get("/quote/delete/:id", customerController().delete_quote);



  // *customer routes
  // order saving route  customer routes
  app.post("/orders", auth, orderController().store);
  // allorder displaying route 
  app.get("/orders", auth, orderController().index);
  app.get("/orders/:id", auth, orderController().show);


  // *admin routes 
  app.get("/admin/orders", admin, AdminOrderController().index);
  app.get("/admin/orders/:id", admin, orderController().show);
  // quotes controller 
  app.get("/admin/quotes", admin, AdminQuotesController().index);
  
  app.post("/admin/quotes", admin, AdminQuotesController().quotes);


  app.post("/admin/status", admin, statusController().update);

  
// API ROUTES
  app.get('/reset_password/:secretToken', authController().resetPassword);
  app.post('/forgot_password', authController().PostForgotPassowrd);
  app.get('/forgot_password', authController().forgotPassword);
  app.post('/reset_password', authController().PostResetPassword);
  app.post('/products', customerController().PostProducts);
}

module.exports = initRoutes;
