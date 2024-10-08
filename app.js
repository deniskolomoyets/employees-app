const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config(); //this will load the .env file and set the environment variables

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json()); //body queries by default are not parsed, so we need to use this middleware to parse the body queries
app.use(express.urlencoded({ extended: false })); //body queries by default are not parsed, so we need to use this middleware to parse the body queries
app.use(cookieParser());

app.use("/api/user", require("./routes/users"));
app.use("/api/employees", require("./routes/employees"));

module.exports = app;
