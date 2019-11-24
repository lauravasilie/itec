require("dotenv").config();
const router = require("express").Router();
const express = require("express");
const app = express();

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
const upload = multer({ storage: storage })

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

app.use(express.static('public'));

app.post('/api/upload', upload.single('photo'), function (req, res, next) {})

router.use(require(__dirname + "/controllers/UserController"));
router.use(require(__dirname + "/controllers/ProductController"));
router.use(require(__dirname + "/controllers/CategoryController"));
router.use(require(__dirname + "/controllers/OrderController"));
// router.use(require(__dirname + "/controllers/PaymentController"));

app.use('/api', router);

module.exports = app;