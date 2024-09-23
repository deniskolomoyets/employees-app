var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json()); //body queries by default are not parsed, so we need to use this middleware to parse the body queries
app.use(express.urlencoded({ extended: false })); //body queries by default are not parsed, so we need to use this middleware to parse the body queries
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
