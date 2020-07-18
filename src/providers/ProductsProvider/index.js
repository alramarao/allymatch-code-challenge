import React, { useState, useCallback } from "react";

export const ProductsContext = React.createContext({
  isModified: false,
  productsList: [],
  updateProductsList: () => {},
  updateProduct: () => {},
  updateSubCategory: () => {},
  updateSubProduct: () => {},
  addNewProduct: () => {},
  addNewSubCategory: () => {},
  addNewSubProduct: () => {},
});

export default function ProductsProvider({ children }) {
  const [isModified, setIsModified] = useState(false);
  const [productsList, setProductsList] = useState(null);

  const getProductsList = () => {
    setIsModified(true);
    return JSON.parse(JSON.stringify(productsList));
  };
  const getIndexByID = (obj, _id) => {
    return obj.findIndex((o) => o.id === _id);
  };
  // const generateNewIDFromArray = (obj) => {
  //   let _id = 0;
  //   if (obj.length > 0) {
  //     _id = Math.max.apply(
  //       Math,
  //       obj.map(function (o) {
  //         return o.id;
  //       })
  //     );
  //   }
  //   if (isNaN(_id)) _id = 1;
  //   else _id = _id + 1;
  //   return _id;
  // };
  const generateNewIDFromArray = (obj) => {
    let _id = 0;
    if (obj.length > 0) {
      _id = Math.max.apply(
        Math,
        obj.map(function (o) {
          return o.id;
        })
      );
    }
    if (isNaN(_id)) _id = 0;
    return _id;
  };
  const productsMax = () => {
    let max = generateNewIDFromArray(productsList);
    return max + 1;
  };
  const categoriesMax = () => {
    let maxID = 0;
    productsList.forEach((product) => {
      let max = generateNewIDFromArray(product.subCategory);
      if (max > maxID) maxID = max;
    });
    return maxID + 1;
  };
  const subProductsMax = () => {
    let maxID = 0;
    productsList.forEach((product) => {
      product.subCategory.forEach((subcategory) => {
        let max = generateNewIDFromArray(subcategory.subProduct);
        if (max > maxID) maxID = max;
      });
    });
    return maxID + 1;
  };

  const newSchema = () => {
    return { id: 0, text: "", isSelected: true, isNew: true };
  };
  const contextValue = {
    isModified,
    productsList,
    updateProductsList: useCallback((products) => {
      setProductsList(products);
    }),
    updateProduct: useCallback((productID, isSelected) => {
      let _productsList = getProductsList();
      const index = getIndexByID(_productsList, productID);
      _productsList[index].isSelected = isSelected;
      setProductsList(_productsList);
    }),
    updateSubCategory: useCallback((productID, subCategoryID, isSelected) => {
      let _productsList = getProductsList();
      const productIndex = getIndexByID(_productsList, productID);
      const subCategoryIndex = getIndexByID(
        _productsList[productIndex].subCategory,
        subCategoryID
      );
      _productsList[productIndex].subCategory[
        subCategoryIndex
      ].isSelected = isSelected;
      setProductsList(_productsList);
    }),
    updateSubProduct: useCallback(
      (productID, subCategoryID, subProductID, isSelected) => {
        let _productsList = getProductsList();
        const productIndex = getIndexByID(_productsList, productID);
        const subCategoryIndex = getIndexByID(
          _productsList[productIndex].subCategory,
          subCategoryID
        );
        const subProductIndex = getIndexByID(
          _productsList[productIndex].subCategory[subCategoryIndex].subProduct,
          subProductID
        );
        _productsList[productIndex].subCategory[subCategoryIndex].subProduct[
          subProductIndex
        ].isSelected = isSelected;
        setProductsList(_productsList);
      }
    ),

    addNewProduct: useCallback((productText) => {
      let _productsList = getProductsList();
      let new_obj = newSchema();
      // new_obj.id = generateNewIDFromArray(_productsList);
      new_obj.id = productsMax();
      new_obj.text = productText;
      new_obj["subCategory"] = [];
      _productsList.push(new_obj);
      setProductsList(_productsList);
    }),
    addNewSubCategory: useCallback((productID, subCategoryText) => {
      let _productsList = getProductsList();
      const productIndex = getIndexByID(_productsList, productID);
      let new_obj = newSchema();
      // new_obj.id = generateNewIDFromArray(
      //   _productsList[productIndex].subCategory
      // );
      new_obj.id = categoriesMax();
      new_obj.text = subCategoryText;
      new_obj["subProduct"] = [];
      _productsList[productIndex].subCategory.push(new_obj);
      setProductsList(_productsList);
    }),
    addNewSubProduct: useCallback(
      (productID, subCategoryID, subProductText) => {
        let _productsList = getProductsList();
        const productIndex = getIndexByID(_productsList, productID);
        const subCategoryIndex = getIndexByID(
          _productsList[productIndex].subCategory,
          subCategoryID
        );
        let new_obj = newSchema();
        // new_obj.id = generateNewIDFromArray(
        //   _productsList[productIndex].subCategory[subCategoryIndex].subProduct
        // );
        new_obj.id = subProductsMax();
        new_obj.text = subProductText;
        _productsList[productIndex].subCategory[
          subCategoryIndex
        ].subProduct.push(new_obj);
        setProductsList(_productsList);
      }
    ),
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
}
