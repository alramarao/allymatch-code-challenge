"use strict";

const DBService = require("../service/service");

/**
 * @controller controllers to perform the actions
 */
var controllers = {
  /**
   * @method getMessage test method to test the service connection
   * @param {Object} req Request parameters
   * @param {Object} res Response response parameters
   */
  getMessage: function (req, res) {
    res.json("Response from Express");
  },


  /**
   * @method getMessage test method to test the service connection
   * @param {Object} req Request parameters
   * @param {Object} res Response response parameters
   */
  getMongoProducts: function (req, res) {
    const service = new DBService();
    service.getProductDetails().then((data) => res.json(data));
  },

  /**
   * @method createProduct to create new Product
   * @param {Object} req Request parameters
   * @param {Object} res Response response parameters
   */
  createProduct: function (req, res) {
    const service = new DBService();
    service.createProduct(req.body).then((data) => res.json(data));
  },

  /**
   * @method createSubCategory to create new SubCategory
   * @param {Object} req Request parameters
   * @param {Object} res Response response parameters
   */
  createSubCategory: function (req, res) {
    const service = new DBService();
    service.createSubCategory(req.body).then((data) => res.json(data));
  },

  /**
   * @method createSubProduct to create new SubProduct
   * @param {Object} req Request parameters
   * @param {Object} res Response response parameters
   */
  createSubProduct: function (req, res) {
    const service = new DBService();
    service.createSubProduct(req.body).then((data) => res.json(data));
  },
};

module.exports = controllers;
