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
const session = require("express-session"); // supprimer ?
// const bookApi = require("book-api"); // a voir si ca marche

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// hbs.registerPartials(path.join(__dirname, "views/partials")); a decommenter quand le partials sera cree

app.use(logger("dev"));
app.use(express.json()); // expose asynchronous posted data in req.body
app.use(express.urlencoded({ extended: false })); // same for synchronous posted data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// INITIALIZE SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);

app.use(flash());

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

module.exports = app;
