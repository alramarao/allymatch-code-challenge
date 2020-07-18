import React from "react";
import useProducts from "../../hooks/useProducts";

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
