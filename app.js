require("dotenv").config();
require("./config/mongo");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flash = require("connect-flash"); // designed to keep messages between 2 http request/response cycles
const hbs = require("hbs");
const session = require("express-session");
const bookApi = require("book-api"); // a voir si ca marche

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// hbs.registerPartials(path.join(__dirname, "views/partials")); a decommenter quand le partials sera cree

module.exports = app;
