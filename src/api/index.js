const api = "http://localhost:8080";

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
export function addProduct(newItem) {
  return addItem(newItem, "createProduct");
}
export function addSubCategory(newItem) {
  return addItem(newItem, "createSubCategory");
}
export function addSubProduct(newItem) {
  return addItem(newItem, "createSubProduct");
}
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
