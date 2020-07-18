const express = require("express");
const bodyParser = require("body-parser");

const { setupDB } = require("./config/databaseConnection");
const cors = require("cors");

const app = express();

setupDB((v) => console.log(v));

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8080;

const routes = require("./api/routes");
routes(app);
app.listen(port, function () {
  console.log("server started on port" + port);
});
