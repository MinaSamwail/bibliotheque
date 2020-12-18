require("dotenv").config();
require("./config/mongo");

// const createError = require("http-errors"); // supprimer ?
const axios = require("axios");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flash = require("connect-flash"); // designed to keep messages between 2 http request/response cycles
const hbs = require("hbs");
const mongoose = require("mongoose");
const session = require("express-session"); // supprimer ?
const MongoStore = require("connect-mongo")(session);

// const bookApi = require("book-api"); // a voir si ca marche

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/views/partial")); //a decommenter quand le partials sera cree

app.use(logger("dev"));
app.use(express.json()); // expose asynchronous posted data in req.body
app.use(express.urlencoded({ extended: false })); // same for synchronous posted data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// INITIALIZE SESSION

app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

app.use(flash());
const middleware = require("./middlewares/exposeFlashMessages");
app.use(middleware);
app.use(require("./middlewares/exposeLoginStatus"));
// Definitions des routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);
//Route vers User
const userRouter = require("./routes/user");
app.use("/user", userRouter);
// Route vers Auth
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

/// KEEP THIS AS THE LAST ONE !
app.use(function (req, res, next) {
  res.status(404);
  res.render("quatrecentrequatre");
});

module.exports = app;
