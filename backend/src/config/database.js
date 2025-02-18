const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

module.exports = new Sequelize(
  process.env.DB_NAME || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    logging:false,
    dialectOptions: {
      useUTC: true,
    },
    sync:{alter:true},
    pool: {
      max: 10000,
      min: 0,
      acquire: 60000,
      idle: 10000,
      evict: 10000,
    },
  }
);