const { getDB } = require("../config/databaseConnection");

class DBService {
  constructor() {
    this.collections = getDB();
  }

  /**
   * @method to retrieve data from collections Products, SubCategory and SubProduct
   * @aggregation to join the all three tables
   * @lookup used lookup's to join the three collections
   */
  getProductDetails() {
    return new Promise((resolve, reject) => {
      this.collections
        .collection("Products")
        .aggregate([
          {
            $lookup: {
              from: "SubCategories",
              localField: "_id",
              foreignField: "p_id",
              as: "subCategory",
            },
          },
          {
            $unwind: {
              path: "$subCategory",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: "SubProducts",
              localField: "subCategory._id",
              foreignField: "c_id",
              as: "subCategory.subProduct",
            },
          },
          {
            $group: {
              _id: "$_id",
              text: { $first: "$text" },
              subCategory: { $push: "$subCategory" },
            },
          },
          {
            $project: {
              _id: 1,
              text: 1,
              subCategory: {
                $filter: {
                  input: "$subCategory",
                  as: "a",
                  cond: { $ifNull: ["$$a._id", false] },
                },
              },
            },
          },
        ])
        .toArray((err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
    });
  }

  /**  
   * @method createProduct to add new Product
   * @param {Object} opt Request.body Product object which needs to be inserted in db 
   * @returns {Object} if it's success then it will returns the newly created Product object, else error object 
   */
  createProduct(opt) {
    return this.createItem(opt, "Products");
  }

  /**  
   * @method createSubCategory to add new SubCategory
   * @param {Object} opt Request.body SubCategory object which needs to be inserted in db 
   * @returns {Object} if it's success then it will returns the newly created SubCategory object, else error object 
   */
  createSubCategory(opt) {
    return this.createItem(opt, "SubCategories");
  }

  /**  
   * @method createSubProduct to add new SubProduct
   * @param {Object} opt Request.body SubProduct object which needs to be inserted in db 
   * @returns {Object} if it's success then it will returns the newly created SubProduct object, else error object 
   */
  createSubProduct(opt) {
    return this.createItem(opt, "SubProducts");
  }

  /** 
   * @param {Object} opt Request.body object which needs to be inserted in db 
   * @param {String} CollectionName name of the collection name
   * @returns {Object} if it's success then it will returns the newly created object, else error object 
   */
  createItem(opt, CollectionName) {
    return new Promise((resolve, reject) => {
      this.collections
        .collection(CollectionName)
        .insertOne(opt, (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data.ops[0]);
        });
      1;
    });
  }
}

module.exports = DBService;
