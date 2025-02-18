const express = require("express");
const Sequelize = require("sequelize");
const db = require("../../src/config/database");
const moment = require("moment");
const app = new express();
app.use(express.json());

const log4js = require("../../log4js");
const logs = log4js.logger;

const Registered_UserDetail = db.define(
  "Registered_UserDetail",
  {
    username: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mobile_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createddate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    isdele: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    tableName: "Registered_UserDetail",
    freezeTableName: true,
    timestamps: false,
    restartIdentity: true,
  }
);

Registered_UserDetail.sync({ alter: true }).then(() => {
  console.log(`table created successfully`);
});

module.exports = Registered_UserDetail;
