const express = require("express");
const bodyParser = require("body-parser");
const app = new express();
app.use(express.json());

const router = express.Router();
router.use("/", require("../Login/userlogin"))

module.exports = router