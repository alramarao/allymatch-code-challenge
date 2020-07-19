const api = "http://localhost:8080";
/**
 * @function GetProducts is a export function to call Web service
 * Retrive Product Details from web serice
 * @returns {Object} returns List of Products
 */
export function getProducts() {
  return fetch(`${api}/getMongoProducts`)
    .then((res) => res.json())
    .then((result) => {
      return describeData(result);
    })
    .catch((error) => {
      return [];
    });
}

/**
 * @function addItem is a local function to submit the http Request
 * It can be used for adding Product or Sub-Category or Sub-Product
 * @param {Object} newItem new object which is going to be added to the database
 * @param {string} methodName web serice method name
 * @returns {Object} returns List of Products
 */
function addItem(newItem, methodName) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  };
  return fetch(`${api}/${methodName}`, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}


/**
 * @function addProduct is a local function to submit the new Product
 * @returns {Object} returns an object of newly created Product / err object
 */
export function addProduct(newItem) {
  return addItem(newItem, "createProduct");
}
/**
 * @function addSubCategory is a local function to submit the new Sub-Category
 * @returns {Object} returns an object of newly created Sub-Category / err object
 */
export function addSubCategory(newItem) {
  return addItem(newItem, "createSubCategory");
}
/**
 * @function addSubProduct is a local function to submit the new Sub-Product
 * @returns {Object} returns an object of newly created Sub-Product / err object
 */
export function addSubProduct(newItem) {
  return addItem(newItem, "createSubProduct");
}
/**
 * @param {Object} data returned by  web serice getMongoProducts
 * map the fields to local objects and adding new parameters isSelected and isNew
 * @property {bool} isSelected is new property to identify the selection
 * @property {bool} isNew is the new property to identify if it's a new Item added by user
 */
const describeData = (data) => {
  return data.map((prod) => {
    let p = {};
    p.id = prod._id;
    p.text = prod.text;
    p.isSelected = false;
    p.isNew = false;
    p.subCategory = prod.subCategory.map((cat) => {
      let c = {};
      c.id = cat._id;
      c.text = cat.text;
      c.isSelected = false;
      c.isNew = false;
      c.subProduct = cat.subProduct.map((sprod) => {
        let sp = {};
        sp.id = sprod._id;
        sp.text = sprod.text;
        sp.isSelected = false;
        sp.isNew = false;
        return sp;
      });
      return c;
    });
    return p;
  });
};
