import React, { useState } from "react";
import useProducts from "../../hooks/useProducts";
import SubProducts from "../subproducts";
import { CSSTransition } from "react-transition-group";

export default function SubCategory(prop) {
  const { updateSubCategory } = useProducts();
  const [isSubProductExpanded, setIsSubProductExpanded] = useState(false);
  return (
    <div>
      <div
        className={prop.subcategory.isSelected ? "title selected" : "title"}
        onClick={() => {
          updateSubCategory(
            prop.productid,
            prop.subcategory.id,
            !prop.subcategory.isSelected
          );
        }}
      >
        {prop.subcategory.text}
      </div>
      {prop.subcategory.isSelected ? (
        <CSSTransition
          in={prop.subcategory.isSelected}
          appear
          timeout={300}
          classNames="transitionitems"
          unmountOnExit
        >
          <div className="select-sub-product">
            <div onClick={() => setIsSubProductExpanded(!isSubProductExpanded)}>
              Select Sub-Products
              <span
                className={isSubProductExpanded ? "arrow down" : "arrow up"}
              ></span>
            </div>
            {isSubProductExpanded ? (
              <CSSTransition
                in={isSubProductExpanded}
                appear
                timeout={200}
                classNames="transitionitems"
                unmountOnExit
              >
                <SubProducts
                  key={prop.subcategory.id}
                  productid={prop.productid}
                  subcategoryid={prop.subcategory.id}
                  subproducts={prop.subcategory.subProduct}
                />
              </CSSTransition>
            ) : (
              ""
            )}
          </div>
        </CSSTransition>
      ) : (
        ""
      )}
    </div>
  );
}
