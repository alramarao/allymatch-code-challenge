import React from "react";
import useProducts from "../../hooks/useProducts";

/**
 * @function SubProduct is functional component
 * SubProduct is the container to display Sub-Product
 * @hook {object} useProducts Custom hook to update the actions
 * @param {object} prop component props
 * @param {object} prop.subproduct Sub-Product Details
 * @param {Number} prop.productid Product ID
 * @param {Number} prop.subcategoryid SubCategory ID
 */
export default function SubProduct(prop) {
  const { updateSubProduct } = useProducts();
  return (
    <div>
      <div
        className={prop.subproduct.isSelected ? "title selected" : "title"}
        onClick={() => {
          updateSubProduct(
            prop.productid,
            prop.subcategoryid,
            prop.subproduct.id,
            !prop.subproduct.isSelected
          );
        }}
      >
        {prop.subproduct.text}
      </div>
    </div>
  );
}
