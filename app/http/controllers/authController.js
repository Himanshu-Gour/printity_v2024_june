const title_Congif = require("../../config/title_config");
const description_config = require("../../config/description_config");
const keyword_config = require("../../config/keyword_config");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const JwtService = require("../../services/JwtService");
const sendMail = require("../../services/sendMail");
const { nanoid } = require('nanoid');

function authController() {
  const _getRedirectUrl = (req) => {
    return req.user.role === 'admin' ? '/admin/orders' : '/dashboard'
  }

  return {
    login(req, res) {
      res.render("auth/login", {
        layout: "../_layout/empty/layout.ejs",
        title: title_Congif().login,
        description: description_config().login,
        keyword: keyword_config().login,
      });
    },
    Postlogin(req, res, next) {
      // const { email, password } = req.body;
      const email = req.body.email.toLowerCase();
      const password = req.body.password.toLowerCase();
      // Validate request
      if (!email || !password) {
        req.flash("email", email)
        req.flash('error', 'All fields are required')
        return res.redirect('/login')
      }
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }

          return res.redirect(_getRedirectUrl(req));
        });
      })(req, res, next);
    },
    signup(req, res) {
      res.render("auth/signup", {
        layout: "../_layout/empty/layout.ejs",
        title: title_Congif().signup,
        description: description_config().signup,
        keyword: keyword_config().signup,
      });
    },
    async Postsignup(req, res) {
      // let { email, password, phoneNumber, confirmPassword, name } = req.body;
      // console.log(phoneNumber)
      const email = req.body.email.toLowerCase();
      const password = req.body.password.toLowerCase();
      const phoneNumber = req.body.phoneNumber.toLowerCase();
      const confirmPassword = req.body.confirmPassword.toLowerCase();
      const name = req.body.name.toLowerCase();

      if (!email || !password || !phoneNumber || !confirmPassword || !name) {
        // console.log(req.body);
        req.flash("email", email);
        req.flash("name", name);
        req.flash("phoneNumber", phoneNumber);
        req.flash("error", "All fields ares required");
        return res.redirect("/signup");
      }
      // confirmPassword validation 
      if (password !== confirmPassword) {
        req.flash("email", email);
        req.flash("name", name);
        req.flash("phoneNumber", phoneNumber);
        req.flash("error", "Password Confirmation does not match password");
        return res.redirect("/signup");
      }
      // Check if email exists
      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "Email already taken");
          req.flash("name", name);
          req.flash("email", email);
          // pehle register tha i have changes it may cause error 
          return res.redirect("/login");
        }
      });
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a user
      // console.log(phoneNumber)
      // creating a user
      const user = new User({
        name: name,
        email: email,
        phonenumber: phoneNumber,
        password: hashedPassword,
      });

      user.save()
        .then((user) => {
          // Login


          return res.redirect("/login");
        })
        .catch(err => {
          // console.log(err)
          req.flash("error", "Something went wrong");
          // return res.redirect("/signup");
        });

    },
    logout(req, res) {
      req.logout();
      return res.redirect("/login");
    },
    async PostForgotPassowrd(req, res) {
      try {
        const { email } = req.body;
        const user = await User.findOne({ email });
       
        if (!email) {
          req.flash('error', 'Fill in all the details');
          res.redirect('/forgot_password');
        }

        if (user) {
          const emailToken = JwtService.sign({ email, token: nanoid(16) });
          sendMail.forgotPassword(email, emailToken);
          req.flash('success','Success! Check your email.');
          res.render("auth/forgotpassword", {
            layout: "../_layout/empty/layout.ejs",
            title: title_Congif().reset_password,
            description: description_config().reset_password,
            keyword: keyword_config().reset_password,
          });
        } else {
          req.flash('error','Email doesnt not exists');
          res.render("auth/forgotpassword", {
            layout: "../_layout/empty/layout.ejs",
            title: title_Congif().reset_password,
            description: description_config().reset_password,
            keyword: keyword_config().reset_password,
          });
        }

      } catch (err) {
        console.log(err)
        res.json({ error: err.message });
      }
    },

      resetPassword(req, res) {
        res.render("auth/changepassword", {
          secretToken: req.params.secretToken.trim(),
          layout: "../_layout/empty/layout.ejs",
          title: title_Congif().reset_password,
          description: description_config().reset_password,
          keyword: keyword_config().reset_password,
        });
    },

      forgotPassword(req, res) {
          res.render("auth/forgotpassword", {
            layout: "../_layout/empty/layout.ejs",
            title: title_Congif().reset_password,
            description: description_config().reset_password,
            keyword: keyword_config().reset_password,
          });
      },

    async PostResetPassword(req, res){
      const { secretToken, newPassword, confirmPassword } = req.body;
      console.log('RECEIVED: ', secretToken, newPassword, confirmPassword)

      if (newPassword !== confirmPassword) {
        req.flash("error", "Password did not match");
        // return res.json({ error: 'Passwords did not match' });
        return res.redirect(`/reset_password/${secretToken}`)
      }
      if (!newPassword || !confirmPassword) {
        req.flash("error", "Fill in all the details");
        // return res.json({ error: 'Passwords did not match' });
        return res.redirect(`/reset_password/${secretToken}`)
      } 
      try {
        const { email, token } = JwtService.verify(secretToken);
        const user = User.findOne({ email });

        if(!user) {
          return res.json({ error: 'No user found' });
        } 

        bcrypt.hash(newPassword, 10, async (err, hash) => {
          if (err) {
            return res.json({ error: err.message });
          };
         await User.updateOne({ email }, { password: hash }, (err, doc) => {
          if (err) {
            return res.json({ error: err.message });
          };
          req.flash('success', 'Password Reset Succesfully!');
          res.redirect('/login');
         }) 
        });
      } catch (err) {
        req.flash('error', err.message);
        return res.render("auth/changepassword", {
          secretToken: req.params.secretToken,
          layout: "../_layout/empty/layout.ejs",
          title: title_Congif().reset_password,
          description: description_config().reset_password,
          keyword: keyword_config().reset_password,
        });
      }
    }
  };
}

module.exports = authController;
