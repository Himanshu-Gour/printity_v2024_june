require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const db_config = require("./app/config/db_config");
const title_Congif = require("./app/config/title_config");
const description_Congif = require("./app/config/description_config");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo")(session);
const passport = require("passport");
const Emitter = require("events");

global.appRoot = path.resolve(__dirname);
// declaring express in app variabl
const app = express();


// database connection


// Connect MongoDB at default port 27017.

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
const url = process.env.MONGO_CONNECTION_URL;
// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: true,
// });


// const connection = mongoose.connection;

// connection.once("open", () => {
//     console.log("Database connected...");
//   })
//   .catch((err) => {
//     console.log("Connection failed...");
// });

const connection = mongoose.connection;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connected...");
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("Connection to the database is open...");
    });
  })
  .catch((err) => {
    console.log("Connection failed...", err);
  });



// Session store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions",
});

// event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

// Session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    store: mongoStore,
    resave: false,
    //! saveUninitialized: false, in tutorial
    saveUninitialized: true,
    // cookie: { maxAge: 1000 * 10 }, // 10sec
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 15 }, // 24 hour*15
  })
);

// Passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// assets
app.use(express.static("public"));
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

// true kar rakha tha pehle 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// declaring port
const PORT = process.env.PORT || 3000;
const host = "http://localhost:";



// setting views engin
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");



// routes
require("./routes/web")(app);

app.use((req, res) => {
  res.status(404).render("error/404", {
    title: title_Congif().not_found,
    description: description_Congif().not_found,
  });
});

// server listening

const server = app.listen(PORT, () => {
  console.log(`listening on Port ${host}${PORT}`);
})


// Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
  // Join
  socket.on('join', (orderId) => {

    socket.join(orderId)


  })
})

eventEmitter.on('orderUpdated', (data) => {
  io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
  io.to('adminRoom').emit('orderPlaced', data)
})