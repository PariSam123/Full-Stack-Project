const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const log4js = require("../../log4js");
const logs = log4js.logger;
const dotenv = require("dotenv");
dotenv.config();
const privateKey = process.env.PRIVATEKAY;
const secretKey = process.env.SECRETKEY;
const userlogin = express.Router();
let refreshtokens = [];
const db = require("../config/database");
const Registered_UserDetail = require("../models/registereduserdetails");

const app = new express();
app.use(express.json());
app.set("trust proxy", true);
const timezone = process.env.TIMEZONE_;
const timeparts = timezone.split(":");
const hours = parseInt(timeparts[0].substring(1), 10);
const minutes = parseInt(timeparts[1], 10);

userlogin.post("/login", async (req, res) => {
  try {
    console.log("user login started");
    const user_details = await Registered_UserDetail.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user_details === 0 || user_details === null) {
      res.status(401).json({ issuccess: false, msg: "user not found" });
    } else {
      if (user_details.isdele === true) {
        console.log("Your account is deleted");
        res.status(403).json({
          issuccess: false,
          msg: "Your account is deleted.",
        });
      } else {
        console.log("login started");
        var encpass = user_details.password.trim();

        var succesresult = await bcrypt.compareSync(
          req.body.pass,
          encpass.trim()
        );

        if (!succesresult) {
          console.log("Error: Incorrect password");
          res.status(400).json({ issuccess: false, msg: "Incorrect password" });
        } else {
          console.log("password successfull");
          var expin = req.body.rem === false ? "2h" : "4h";
          if (req.body.from) {
            expin = "2y";
          }
          var jwt_token = await jwt.sign(
            {
              Username: user_details.username,
              Email: user_details.email,
              Mobile_No: user_details.mobile_number,
              Userid: user_details.id,
              Roles: user_details.roles,
            },
            privateKey,
            { expiresIn: expin },
            { algorithms: ["HS512"] }
          );
          let refresh_token = await jwt.sign(
            {
              Username: user_details.username,
              Email: user_details.email,
              Mobile_No: user_details.mobile_number,
              Userid: user_details.id,
              Roles: user_details.roles,
            },
            secretKey,
            { expiresIn: "1d" },
            { algorithms: ["HS512"] }
          );
          refreshtokens.push(refresh_token);
          refreshtokens.push(refresh_token);
          const responses = {
            jwt_token,
            refresh_token,
          };
          if (req.body.from) {
            res.header("authorization", responses).format({
              json: function () {
                var responsedata = {};
                responsedata["status"] = 200;
                responsedata["message"] = "login successfully.";
                responsedata["contenttype"] = "application/json.";
                res.json(responses);
              },
            });
          } else {
            res
              .status(400)
              .json({ issuccess: false, msg: "Parameters missing" });
          }
        }
      }
    }
  } catch (ex) {
    //console.log(ex);
    logs.error(ex);
    res.status(400).send(ex.message);
  }
});

userlogin.post("/signUp", async (req, res) => {
  console.log("req.body",req.body);
  let transaction = await db.transaction({ autocommit: false });
  try {
    const {
      name,
      ph_no,
      email,
      password
    } = req.body;
    const getConsumer = await Registered_UserDetail.findOne({
      where: {
          mobile_number: ph_no,
        isdele: false
      },
      raw: true,
    });
    console.log("getConsumer",getConsumer);
    if (getConsumer) {
      res.status(400).json({
        issuccess: false,
        msg: "User Detail is Already present",
      });
    } else {
      const password_hash = await bcrypt.hashSync(password, 10);
      console.log("password_hash",password_hash)
      await Registered_UserDetail.create({
        username: name,
        email: email,
        password: password_hash,
        mobile_number: ph_no,
        createddate: moment()
        .add(hours, "hours")
        .add(minutes, "minutes")
        .format("YYYY-MM-DD HH:mm:ss"),
      }, { transaction: transaction })
      await transaction.commit();
      res
        .status(200)
        .json({ issuccess: true, msg: "Pump Detail added Successfully" });
    }

  } catch (error) {
    console.log("error", error)
    await transaction.rollback();
    res.status(400).json({ issuccess: false, message: error });
  }
})

module.exports = userlogin;
