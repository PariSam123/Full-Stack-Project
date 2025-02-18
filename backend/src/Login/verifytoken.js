const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = new express();
app.use(express.json());

const log4js = require("../../log4js");
const logs = log4js.logger;

const Registered_UserDetail = require("../models/registereduserdetails");

const privateKey = process.env.PRIVATEKAY;

var validuser = (req, res, next) => {
  try {
    req.token = req.headers.authorization;

    jwt.verify(req.token, privateKey, async (err, data) => {
      if (err) {
        res.status(401).send("Invalid Token");
      } else {
        const user_id = jwt.decode(req.token).Userid,
          user_role = jwt.decode(req.token).Roles;
        const get_userdetails = await Registered_UserDetail.findOne({
          where: { id: user_id },
        });
        next();
      }
    });
  } catch (ex) {
    logs.error(ex);
    res.status(400).json({ issuccess: false, msg: ex.message });
  }
};
module.exports = { validuser };
