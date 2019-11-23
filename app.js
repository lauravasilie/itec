require("dotenv").config();
const router = require("express").Router();
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require('cors');

require('./config/passport');

app.options('*', cors())
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

router.use(require(__dirname + "/controllers/UserController"));
// router.use(require(__dirname + "/controllers/ProductController"));
router.use(require(__dirname + "/controllers/CategoryController"));

app.use('/api', router);

module.exports = app;