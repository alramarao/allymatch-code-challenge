import { useContext } from "react";
import { ProductsContext } from "../../providers/ProductsProvider";

/**
 * @function useProducts is custom hook to maintain the data and actions across the application
 * @exports {Boolean} isModified to identify whether the productsList has changed or not
 * @exports {Array} productsList is an array of objects which will hold Products list with respective sub categories and sub-products
 * @exports {function} updateProductsList to update the productsList
 * @exports {function} updateProduct to handle Product selection/unselection
 * @exports {function} updateSubCategory to handle Sub-Category selection/unselection
 * @exports {function} updateSubProduct to handle Sub-Product selection/unselection
 * @exports {function} addNewProduct to add new Product to local state productsList
 * @exports {function} addNewSubCategory to add new Sub-Category to local state productsList
 * @exports {function} addNewSubProduct to add new Sub-Product to local state productsList
 */
function useProducts() {
  const {
    isModified,
    productsList,
    updateProductsList,
    updateProduct,
    updateSubCategory,
    updateSubProduct,
    addNewProduct,
    addNewSubCategory,
    addNewSubProduct,
  } = useContext(ProductsContext);
  return {
    isModified,
    productsList,
    updateProductsList,
    updateProduct,
    updateSubCategory,
    updateSubProduct,
    addNewProduct,
    addNewSubCategory,
    addNewSubProduct,
  };
}
export default useProducts;
