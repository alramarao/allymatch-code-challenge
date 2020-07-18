"use strict";

const DBService = require("../service/service");
var controllers = {
  getMessage: function (req, res) {
    res.json("Response from Express");
  },

  getMongoProducts: function (req, res) {
    const service = new DBService();
    service.getProductDetails().then((data) => res.json(data));
  },

  createProduct: function (req, res) {
    const service = new DBService();
    service.createProduct(req.body).then((data) => res.json(data));
  },
  createSubCategory: function (req, res) {
    const service = new DBService();
    service.createSubCategory(req.body).then((data) => res.json(data));
  },
  createSubProduct: function (req, res) {
    const service = new DBService();
    service.createSubProduct(req.body).then((data) => res.json(data));
  },
};

module.exports = controllers;
