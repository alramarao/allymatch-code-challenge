import { useContext } from "react";
import { ProductsContext } from "../../providers/ProductsProvider";

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
