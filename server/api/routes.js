"use strict";
const controller = require("./controller");

module.exports = function (app) {
  app.route("/getMessage").get(controller.getMessage);

  app.route("/getMongoProducts").get(controller.getMongoProducts);
  app.route("/createProduct").post(controller.createProduct);
  app.route("/createSubCategory").post(controller.createSubCategory);
  app.route("/createSubProduct").post(controller.createSubProduct);
};
