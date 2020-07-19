"use strict";
const controller = require("./controller");

module.exports = function (app) {
  /**
   * @route getMessage to test the web service connection
   * @method GET
   */
  app.route("/getMessage").get(controller.getMessage);

  /**
   * @route getMongoProducts to retrieve Products List
   * @method GET
   */
  app.route("/getMongoProducts").get(controller.getMongoProducts);

  /**
   * @route createProduct to add new Product
   * @method POST
   */
  app.route("/createProduct").post(controller.createProduct);

  /**
   * @route createSubCategory to add new SubCategory
   * @method POST
   */
  app.route("/createSubCategory").post(controller.createSubCategory);

  /**
   * @route createSubProduct to add new SubProduct
   * @method POST
   */
  app.route("/createSubProduct").post(controller.createSubProduct);
};
