const express = require("express");

var useragent = require("express-useragent");
const bodyParser = require("body-parser");
var cors = require("cors");
const log4js = require("./log4js");
const logs = log4js.logger;

const app = express();
const server = require("http").createServer(app);

module.exports.Server = server;

app.use(useragent.express());
app.use(express.json({ limit: "100mb", extended: true }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const db = require("./src/config/database");
db.authenticate()
  .then(() => {
    console.log("Database 1 connected..", process.env.DB_NAME);
  })
  .catch((err) => {
    console.log("Error in database", err);
  });

app.use("/", require("./src/routes/RouteAPI"));

const port = process.env.PORT;

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
