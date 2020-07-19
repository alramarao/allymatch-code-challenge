import React, { useState, useCallback } from "react";

export const ProductsContext = React.createContext({
  isModified: false,
  productsList: [],
  updateProductsList: () => { },
  updateProduct: () => { },
  updateSubCategory: () => { },
  updateSubProduct: () => { },
  addNewProduct: () => { },
  addNewSubCategory: () => { },
  addNewSubProduct: () => { },
});
/**
 * @function useProducts is custom hook to maintain the data and actions across the application
 * @extends {Boolean} isModified to identify whether the productsList has changed or not
 * @extends {Array} productsList is an array of objects which will hold Products list with respective sub categories and sub-products
 * @extends {function} updateProductsList to update the productsList
 * @extends {function} updateProduct to handle Product selection/unselection
 * @extends {function} updateSubCategory to handle Sub-Category selection/unselection
 * @extends {function} updateSubProduct to handle Sub-Product selection/unselection
 * @extends {function} addNewProduct to add new Product to local state productsList
 * @extends {function} addNewSubCategory to add new Sub-Category to local state productsList
 * @extends {function} addNewSubProduct to add new Sub-Product to local state productsList
 */
export default function ProductsProvider({ children }) {
  const [isModified, setIsModified] = useState(false);
  const [productsList, setProductsList] = useState(null);

  /**
   * @returns {Object} Array of Objects which is the copy of original productsList object
   */
  const getProductsList = () => {
    setIsModified(true);
    return JSON.parse(JSON.stringify(productsList));
  };
  /**
   * @method getIndexByID to get the Index value of the given ID from an array
   * @param {Array} obj Array of objects
   * @param {Number} _id ID 
   * @returns {Number} index value
   */
  const getIndexByID = (obj, _id) => {
    return obj.findIndex((o) => o.id === _id);
  };

  /**
   * @method getMaxIDFromArray to get the Max value of ID from given Array
   * @param {Array} obj Array of objects
   * @returns {Number} maximum vlaue of any ID property for given array
   */
  const getMaxIDFromArray = (obj) => {
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
  /**
   * @method productsMax to generate next available new ID number based on existing products
   * @returns {Number} new ID value for new Product
   */
  const productsMax = () => {
    let max = getMaxIDFromArray(productsList);
    return max + 1;
  };

  /**
   * @method categoriesMax to generate next available new ID number based on existing sub-categoies
   * @returns {Number} new ID value for new SubCategories
   */
  const categoriesMax = () => {
    let maxID = 0;
    productsList.forEach((product) => {
      let max = getMaxIDFromArray(product.subCategory);
      if (max > maxID) maxID = max;
    });
    return maxID + 1;
  };

  /**
   * @method subProductsMax to generate next available new ID number based on existing sub-products
   * @returns {Number} new ID value for new Sub-Product
   */
  const subProductsMax = () => {
    let maxID = 0;
    productsList.forEach((product) => {
      product.subCategory.forEach((subcategory) => {
        let max = getMaxIDFromArray(subcategory.subProduct);
        if (max > maxID) maxID = max;
      });
    });
    return maxID + 1;
  };

  /**
   * @method newSchema to crate empty object
   * @returns {Object} created empty object
   */
  const newSchema = () => {
    return { id: 0, text: "", isSelected: true, isNew: true };
  };

  /**
   * @value contextValue is the context value for the provider
   */
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
