const { getDB } = require("../config/databaseConnection");

class DBService {
  constructor() {
    this.collections = getDB();
  }

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
  createProduct(opt) {
    return this.createItem(opt, "Products");
  }
  createSubCategory(opt) {
    return this.createItem(opt, "SubCategories");
  }
  createSubProduct(opt) {
    return this.createItem(opt, "SubProducts");
  }

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
